import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Form, Link, useLoaderData, useLocation } from "@remix-run/react";
import invariant from "tiny-invariant";
import { getCategories } from "~/lib/api/category";
import { language } from "~/lib/api/config";
import { client, getJSON } from "~/lib/api/fetcher";
import { getStandings } from "~/lib/api/player";
import PageHeader from "~/lib/components/pageHeader";
import Pagination from "~/lib/components/pagination";
import type { Category } from "~/lib/interfaces/api/category";
import type { Player } from "~/lib/interfaces/api/player";

export const loader: LoaderFunction = async ({
  params: { category },
  request,
}) => {
  const url = new URL(request.url);
  const page = parseInt(url.searchParams.get("page") ?? "1");
  const pageSize = 50;
  const headers = new Headers();
  invariant(category, "Expected Category");
  const [categories, rawStandings] = await Promise.all([
    getCategories(),
    getStandings(category, page - 1, pageSize),
  ]);

  const transaction = client.multi();

  for (const id of rawStandings) {
    transaction.hGet(`accsaber:players:${category}`, id);
  }

  const unparsedStandings = await transaction.exec(true);

  const unfiltered: Player[] = [];

  for (const rawPlayer of unparsedStandings) {
    if (typeof rawPlayer === "string") {
      unfiltered.push(JSON.parse(rawPlayer));
    }
  }

  const filterString = url.searchParams.get("filter");
  const standings =
    typeof filterString === "string"
      ? unfiltered.filter((i) =>
          i.playerName.toLowerCase().includes(filterString.toLowerCase())
        )
      : unfiltered;

  headers.set(
    "cache-control",
    `public, max-age=86400, stale-while-revalidate=86400`
  );
  return json(
    {
      categories: [...categories.values()],
      standings: standings,
      current: category,
      page,
      pages: Math.ceil(
        (await client.zCard(`accsaber:standings:${category}`)) / pageSize
      ),
      headers,
    },
    {
      headers,
    }
  );
};

export function CatchBoundary() {}

const LeaderboardPage = () => {
  const { categories, standings, current, page, pages } = useLoaderData<{
    categories: Category[];
    standings: Player[];
    current: string;
    page: number;
    pages: number;
  }>();

  const location = useLocation();
  const params = new URLSearchParams(location.search);
  return (
    <>
      <PageHeader
        navigation={[
          { categoryName: "overall", categoryDisplayName: "Overall" },
          ...categories,
        ].map(({ categoryDisplayName, categoryName }) => ({
          href: `/leaderboards/${categoryName}`,
          label: categoryDisplayName,
          isCurrent: categoryName == current,
        }))}
      >
        Leaderboards
      </PageHeader>
      <main className="p-4 max-w-screen-lg mx-auto flex flex-col gap-8">
        {/* <Form method="get" className="flex shadow rounded overflow-hidden">
          <input type="hidden" name="page" value={page} />
          <input
            type="search"
            name="filter"
            placeholder="Search"
            className="flex-1 p-2 px-3 focus:outline-none dark:bg-neutral-800 dark:text-white"
            defaultValue={params.get("filter") ?? ""}
          />
          <button
            type="submit"
            aria-label="Search"
            className="p-2 dark:bg-neutral-800 dark:text-white"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </Form> */}
        {pages > 1 ? <Pagination currentPage={page} pages={pages} /> : ""}
        <div className="prose dark:prose-invert max-w-none">
          <table className="w-full overflow-auto">
            <thead>
              <tr>
                <th>Rank</th>
                <th></th>
                <th>Name</th>
                <th>AP</th>
                <th>Average Acc</th>
                <th>Ranked Plays</th>
                <th>Average AP</th>
                <th>HMD</th>
              </tr>
            </thead>
            <tbody>
              {standings.map((player) => (
                <tr key={player.playerId}>
                  <td>#{player.rank}</td>
                  <td className="relative aspect-square w-10">
                    <picture>
                      <source
                        srcSet={`/profile/${player.playerId}.thumbnail.avif`}
                        type="image/avif"
                      />
                      <source
                        srcSet={`/profile/${player.playerId}.thumbnail.webp`}
                        type="image/webp"
                      />
                      <img
                        src={`/profile/${player.playerId}.thumbnail.jpeg`}
                        alt={`${player.playerName}'s profile`}
                        loading="lazy"
                        className="absolute top-0 left-0 m-0"
                      />
                    </picture>
                  </td>
                  <td>
                    <Link
                      to={`/profile/${player.playerId}/${current}/scores`}
                      prefetch="intent"
                    >
                      {player.playerName}
                    </Link>
                  </td>
                  <td>
                    {player.ap.toLocaleString(language, {
                      maximumFractionDigits: 2,
                    })}
                  </td>
                  <td>
                    {(player.averageAcc * 100).toLocaleString(language, {
                      maximumFractionDigits: 2,
                    })}
                    %
                  </td>
                  <td>{player.rankedPlays}</td>
                  <td>
                    {player.averageApPerMap.toLocaleString(language, {
                      maximumFractionDigits: 2,
                    })}
                  </td>
                  <td>{player.hmd}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {pages > 1 ? <Pagination currentPage={page} pages={pages} /> : ""}
      </main>
    </>
  );
};

export default LeaderboardPage;
