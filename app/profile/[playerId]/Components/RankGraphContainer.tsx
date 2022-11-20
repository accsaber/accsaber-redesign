import { use } from "react";
import { json } from "~/lib/api/fetcher";
import RankGraph from "./RankGraph";

export default async function RankGraphContainer({
  playerId,
  category = "overall",
}: {
  playerId: string;
  category?: string;
}) {
  const history = await json<{ [date: string]: number }>(
    `players/${playerId}${
      category !== "overall" ? `/${category}` : ""
    }/recent-rank-history`
  );

  return <RankGraph history={Object.entries(history).slice(-30)} />;
}
