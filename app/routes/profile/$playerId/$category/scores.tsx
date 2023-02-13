import type { PlayerScoresPageQuery } from "$gql";
import { AccSaberScoresOrderBy, PlayerScoresPageDocument } from "$gql";
import GQLSortButton from "@/GQLSortButton";
import Pagination from "@/Pagination";
import ScoreRow from "@/ScoreRow";
import type { LoaderFunction, MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";
import { gqlClient } from "~/lib/api/gql";

const pageSize = 25;

interface ScoresData {
  page: number;
  pageSize: number;
  sortByParam: keyof typeof AccSaberScoresOrderBy;
  scores: PlayerScoresPageQuery["accSaberScores"];
  playerId: string;
}

export const loader: LoaderFunction = async ({
  params: { playerId, category = "overall" },
  request,
}) => {
  const { searchParams } = new URL(request.url);
  invariant(playerId);
  invariant(category);

  const sortByParam = (searchParams.get("sortBy") ??
    "WeightedApDesc") as keyof typeof AccSaberScoresOrderBy;
  const page = parseInt(searchParams.get("page") ?? "1");

  const { accSaberScores: scores } = await gqlClient.request(
    PlayerScoresPageDocument,
    {
      playerId,
      pageSize,
      offset: (page - 1) * pageSize,
      orderBy:
        AccSaberScoresOrderBy[sortByParam] ??
        AccSaberScoresOrderBy.WeightedApDesc,
    }
  );
  return json({
    page,
    pageSize,
    sortByParam,
    scores,
    playerId,
  } as ScoresData);
};
export default function PlayerScoresPage() {
  const { page, pageSize, sortByParam, scores, playerId } =
    useLoaderData<ScoresData>();
  const columns: [
    (keyof typeof AccSaberScoresOrderBy)[] | null,
    string,
    number?
  ][] = [
    [["RankingAsc", "RankingDesc"], ""],
    [["SongNameAsc", "SongNameDesc"], "Song Name", 2],
    [null, "Difficulty"],
    [null, "Category"],
    [["AccuracyAsc", "AccuracyDesc"], "Accuracy"],
    [null, ""],
    [["ApDesc", "ApAsc"], "AP"],
    [["WeightedApDesc", "WeightedApAsc"], "Weighted"],
    [["TimeSetDesc", "TimeSetAsc"], "Time Set"],
    [["ComplexityAsc", "ComplexityDesc"], "Complexity"],
  ];

  return (
    <div className="flex flex-col gap-8">
      <Pagination
        currentPage={page}
        pages={Math.ceil((scores?.totalCount ?? 0) / pageSize)}
      />
      <div className="w-full max-w-full overflow-x-auto overflow-y-hidden prose dark:prose-invert">
        <table className="overflow-auto whitespace-nowrap">
          <thead>
            <tr>
              {columns.map(([value, friendly, colSpan], n) => (
                <th key={value?.toString() ?? n} colSpan={colSpan}>
                  {value ? (
                    <GQLSortButton values={value} currentValue={sortByParam}>
                      {friendly}
                    </GQLSortButton>
                  ) : (
                    friendly
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {scores?.nodes.map((score) => (
              <ScoreRow playerId={playerId} score={score} key={score.scoreId} />
            ))}
          </tbody>
        </table>
      </div>
      <Pagination
        currentPage={page}
        pages={Math.ceil((scores?.totalCount ?? 0) / pageSize)}
      />
    </div>
  );
}
