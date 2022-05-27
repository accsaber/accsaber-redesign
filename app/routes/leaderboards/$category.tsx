import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";
import { language } from "~/lib/api/config";
import { get } from "~/lib/api/fetcher";
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

  invariant(category, "Expected Category");
  const [categories, standings] = await Promise.all([
    get<Category[]>(`/categories`),
    get<Player[]>(`/categories/${category}/standings`),
  ]);
  return json({
    categories,
    standings: standings.splice((page - 1) * pageSize, pageSize),
    current: category,
    page,
    pages: Math.ceil(standings.length / pageSize),
  });
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
        <Pagination currentPage={page} pages={pages} />
        <div className="prose dark:prose-invert max-w-none">
          <table className="w-full overflow-auto">
            <thead>
              <tr>
                <th>Rank</th>
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
                  <td>
                    <Link to={`/profile/${player.playerId}/scores`}>
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
        <Pagination currentPage={page} pages={pages} />
      </main>
    </>
  );
};

export default LeaderboardPage;
