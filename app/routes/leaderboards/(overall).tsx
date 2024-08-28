import { OverallLeaderboardDocument } from "$gql";
import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { gqlClient } from "~/lib/api/gql";
import { withTiming } from "~/lib/timing";
import { categoryMap, pageSize } from "./$category";
import { metaV1 } from "@remix-run/v1-meta";

export const meta: MetaFunction<typeof loader> = (args) =>
  metaV1(args, {
    title: args.data?.category
      ? `AccSaber ${
          categoryMap.get(args.data?.category) ?? args.data?.category
        } leaderboard`
      : "AccSaber",
    description: `${args.data?.totalCount} Beat Saber players, ranked by all of their scores on AccSaber maps`,
  });

export const loader = async ({ request }: LoaderFunctionArgs) => {
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
