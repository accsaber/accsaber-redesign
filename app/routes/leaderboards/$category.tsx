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
import PlayerRow from "~/lib/components/playerRow";
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
                <PlayerRow
                  player={player}
                  key={player.playerId}
                  current={current}
                />
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
