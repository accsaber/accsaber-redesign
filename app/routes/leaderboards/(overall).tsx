import { OverallLeaderboardDocument } from "$gql";
import type { LoaderArgs, MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { gqlClient } from "~/lib/api/gql";
import { withTiming } from "~/lib/timing";
import { categoryMap, pageSize } from "./$category";

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  return {
    title: `AccSaber ${
      categoryMap.get(data.category) ?? data.category
    } leaderboard`,
    description: `${data.totalCount} Beat Saber players, ranked by all of their scores on AccSaber maps`,
  };
};

export const loader = async ({ request }: LoaderArgs) => {
  const { searchParams } = new URL(request.url);
  const headers = new Headers();

  const page = parseInt(searchParams.get("page") ?? "1");

  const { categories, overallAccSaberPlayers } = await gqlClient
    .request(OverallLeaderboardDocument, {
      pageSize: 50,
      offset: (page - 1) * pageSize,
    })
    .then(withTiming(headers, "query", "GraphQL Query"));

  return json(
    {
      category: "overall",
      categories,
      standings: overallAccSaberPlayers?.nodes,
      page,
      pages: Math.ceil((overallAccSaberPlayers?.totalCount ?? 0) / 50),
      totalCount: overallAccSaberPlayers?.totalCount,
    },
    { headers }
  );
};

export { default } from "./$category";
