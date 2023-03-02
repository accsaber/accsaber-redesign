import { CategoryLeaderboardDocument } from "$gql";
import type { Category } from "$interfaces/api/category";
import type { Player } from "$interfaces/api/player";
import PageHeader from "@/PageHeader";
import Pagination from "@/Pagination";
import PlayerRow from "@/PlayerRow";
import type { LoaderArgs, MetaFunction } from "@remix-run/node";
import { json as jsonResponse } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";
import { gqlClient } from "~/lib/api/gql";
import { withTiming } from "~/lib/timing";

interface LeaderboardData {
  categories: Category[];
  category: string;
  standings: Player[];
  page: number;
  pages: number;
}

export const pageSize = 50;

export const loader = async ({
  params: { category = "overall" },
  request,
}: LoaderArgs) => {
  invariant(category);
  const { searchParams } = new URL(request.url);
  const headers = new Headers();

  const page = parseInt(searchParams.get("page") ?? "1");

  const { categories, categoryAccSaberPlayers } = await gqlClient
    .request(CategoryLeaderboardDocument, {
      category,
      pageSize,
      offset: (page - 1) * pageSize,
    })
    .then(withTiming(headers, "query", "GraphQL Query"));

  return jsonResponse(
    {
      category,
      categories,
      standings: categoryAccSaberPlayers?.nodes,
      page,
      pages: Math.ceil((categoryAccSaberPlayers?.totalCount ?? 0) / 50),
    },
    { headers }
  );
};

const categoryMap = new Map([
  ["true", " True Acc"],
  ["standard", " Standard Acc"],
  ["tech", " Tech Acc"],
  ["overall", " overall"],
]);

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  // ungodly hack to do some type coersion
  return {
    title: `AccSaber${categoryMap.get(data.category) ?? ""} leaderboard`,
  };
};

export default function LeaderboardsPage() {
  const { category, categories, page, pages, standings } =
    useLoaderData<typeof loader>();

  const categoryLinks =
    categories?.nodes?.map((cat) => ({
      href: `/leaderboards/${cat.categoryName}`,
      label: cat.categoryDisplayName ?? "",
      isCurrent: category == cat.categoryName,
    })) ?? [];
  return (
    <div>
      <PageHeader
        navigation={[
          {
            href: `/leaderboards/overall`,
            label: `Overall`,
            isCurrent: category == "overall",
          },
          ...categoryLinks,
        ]}
      >
        Leaderboards
      </PageHeader>
      <main className="flex flex-col max-w-screen-lg gap-8 p-4 mx-auto">
        {pages > 1 && <Pagination currentPage={page} pages={pages} />}
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
              {standings.map((player, n) => (
                <PlayerRow
                  player={player}
                  key={player.playerId}
                  current={category}
                />
              ))}
            </tbody>
          </table>
        </div>
        {pages > 1 && <Pagination currentPage={page} pages={pages} />}
      </main>
    </div>
  );
}
