import Pagination from "~/app/Components/Pagination";
import invariant from "tiny-invariant";
import ScoreRow from "../../Components/ScoreRow";
import { sdk } from "~/lib/api/gql";
import { use } from "react";
import { AccSaberScoresOrderBy } from "~/lib/__generated__/gql";
import GQLSortButton from "@/GQLSortButton";

export default function PlayerScoresPage({
  params,
  searchParams,
}: {
  params?: Record<string, string>;
  searchParams?: Record<string, string | string[]>;
}) {
  invariant(params?.playerId);
  invariant(params?.category);
  const pageSize = 50;
  const sortByParam = (searchParams?.sortBy?.toString() ??
    "WeightedApDesc") as keyof typeof AccSaberScoresOrderBy;
  const page = parseInt(searchParams?.page?.toString() ?? "1");
  const { accSaberScores: scores } = use(
    sdk.PlayerScoresPage({
      playerId: params.playerId,
      pageSize,
      offset: (page - 1) * pageSize,
      orderBy:
        AccSaberScoresOrderBy[sortByParam] ??
        AccSaberScoresOrderBy.WeightedApDesc,
    })
  );

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
        searchParams={searchParams}
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
              <ScoreRow
                playerId={params.playerId}
                score={score}
                key={score.scoreId}
              />
            ))}
          </tbody>
        </table>
      </div>
      <Pagination
        searchParams={searchParams}
        currentPage={page}
        pages={Math.ceil((scores?.totalCount ?? 0) / pageSize)}
      />
    </div>
  );
}
