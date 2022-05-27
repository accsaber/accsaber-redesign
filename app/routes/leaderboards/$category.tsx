import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";
import { language } from "~/lib/api/config";
import { get } from "~/lib/api/fetcher";
import PageHeader from "~/lib/components/pageHeader";
import type { Category } from "~/lib/interfaces/api/category";
import type { Player } from "~/lib/interfaces/api/player";

export const loader: LoaderFunction = async ({ params: { category } }) => {
  invariant(category, "Expected Category");
  const [categories, standings] = await Promise.all([
    get<Category[]>(`/categories`),
    get(`/categories/${category}/standings`),
  ]);
  return json({ categories, standings, current: category });
};

export function CatchBoundary() {}

const LeaderboardPage = () => {
  const { categories, standings, current } = useLoaderData<{
    categories: Category[];
    standings: Player[];
    current: string;
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
      <main className="p-4 max-w-screen-lg mx-auto">
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
      </main>
    </>
  );
};

export default LeaderboardPage;
