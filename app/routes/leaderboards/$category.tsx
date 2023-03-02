import type { LoaderFunction, MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData, useLocation } from "@remix-run/react";
import invariant from "tiny-invariant";
import { getCategories } from "~/lib/api/category";
import { getStandings } from "~/lib/api/player";
import PageHeader from "~/lib/components/pageHeader";
import Pagination from "~/lib/components/pagination";
import PlayerRow from "~/lib/components/playerRow";
import type { Category } from "~/lib/interfaces/api/category";
import type { Player } from "~/lib/interfaces/api/player";

export const meta: MetaFunction = ({ data }) => ({
  title: `AccSaber ${
    data?.currentFull?.categoryDisplayName ?? "Overall"
  } Leaderboard`,
  description: `${
    data?.currentFull?.categoryDisplayName ?? "Overall"
  } on AccSaber, the competitive accuracy leaderboard`,
});

export const loader: LoaderFunction = async ({
  params: { category },
  request,
}) => {
  const url = new URL(request.url);
  const page = parseInt(url.searchParams.get("page") ?? "1");
  const pageSize = 50;
  const headers = new Headers();
  invariant(category, "Expected Category");
  const [categories, { length: total, standings: unfiltered }] =
    await Promise.all([
      getCategories(),
      getStandings(category, page - 1, pageSize),
    ]);

  if (!unfiltered) throw new Response("Leaderboard not found", { status: 404 });

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
      currentFull: categories.get(category),
      page,
      pages: Math.ceil(total / pageSize),
      headers,
    },
    {
      headers,
    }
  );
};

const LeaderboardPage = () => {
  const { categories, standings, current, page, pages } = useLoaderData<{
    categories: Category[];
    standings: Player[];
    current: string;
    page: number;
    pages: number;
  }>();

  return (
    <>
      <PageHeader
        navigation={[
          { categoryName: "overall", categoryDisplayName: "Overall" },
          ...(categories ?? []),
        ].map(({ categoryDisplayName, categoryName }) => ({
          href: `/leaderboards/${categoryName}`,
          label: categoryDisplayName,
          isCurrent: categoryName == current,
        }))}
      >
        Leaderboards
      </PageHeader>
      <main className="flex flex-col max-w-screen-lg gap-8 p-4 mx-auto">
        {pages > 1 ? <Pagination currentPage={page} pages={pages} /> : ""}
        <div className="prose dark:prose-invert max-w-none">
          <table className="w-full overflow-auto">
            <thead>
              <tr>
                <th>Rank</th>
                <th></th>
                <th>Name</th>
                <th>AP</th>
                <th className="hidden md:table-cell">Average Acc</th>
                <th className="hidden md:table-cell">Ranked Plays</th>
                <th className="hidden md:table-cell">Average AP</th>
                <th className="hidden md:table-cell">HMD</th>
              </tr>
            </thead>
            <tbody>
              {standings?.map((player) => (
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
