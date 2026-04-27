import type { PlayerScoresPageQuery, ScoreRowFragment } from "$gql";
import { AccSaberScoresOrderBy, PlayerScoresPageDocument } from "$gql";
import BlankBlock from "@/BlankBlock";
import GQLSortButton from "@/GQLSortButton";
import Pagination from "@/Pagination";
import ScoreRow from "@/ScoreRow";
import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData, useLocation, useNavigation } from "@remix-run/react";
import invariant from "tiny-invariant";
import { gqlClient } from "~/lib/api/gql";
import { now } from "~/lib/timing";

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

  const sortByParam = (searchParams.get("sortBy") ??
    "WeightedApDesc") as keyof typeof AccSaberScoresOrderBy;
  const page = parseInt(searchParams.get("page") ?? "1");

  const headers = new Headers();
  const started = now();

  const { accSaberScores: scores } = await gqlClient.request(
    PlayerScoresPageDocument,
    {
      playerId,
      pageSize,
      offset: (page - 1) * pageSize,
      category: category !== "overall" ? category : undefined,
      orderBy:
        AccSaberScoresOrderBy[sortByParam] ??
        AccSaberScoresOrderBy.WeightedApDesc,
    }
  );
  headers.append(
    "Server-Timing",
    `query;desc="GraphQL Query";dur=${now() - started}`
  );

  return json(
    {
      page,
      pageSize,
      sortByParam,
      scores,
      playerId,
    } as ScoresData,
    {
      headers,
    }
  );
};
export default function PlayerScoresPage() {
  const { page, pageSize, sortByParam, scores, playerId } =
    useLoaderData<ScoresData>();
  const columns: [
    (keyof typeof AccSaberScoresOrderBy)[] | null,
    string,
    number?
  ][] = [
    [["RankingAsc", "RankingDesc"], "", 2],
    [["SongNameAsc", "SongNameDesc"], "Song Name"],
    [["CategoryDisplayNameAsc", "CategoryDisplayNameDesc"], "Category"],
    [["AccuracyAsc", "AccuracyDesc"], "Accuracy"],
    [null, ""],
    [["ApDesc", "ApAsc"], "AP"],
    [["WeightedApDesc", "WeightedApAsc"], "Weighted"],
    [["TimeSetDesc", "TimeSetAsc"], "Time Set"],
    [["ComplexityAsc", "ComplexityDesc"], "Complexity"],
  ];

  const { pathname } = useLocation();
  const { state, location } = useNavigation();
  const pendingSearch = location?.search
    ? new URLSearchParams(location.search)
    : undefined;
  const pendingPage = pendingSearch?.has("page")
    ? parseInt(pendingSearch.get("page") ?? "-1")
    : undefined;

  return (
    <div className="flex flex-col gap-8">
      <Pagination
        currentPage={pendingPage ?? page}
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
                playerId={playerId}
                score={score as ScoreRowFragment}
                key={score.scoreId}
              />
            ))}
          </tbody>
        </table>
      </div>
      <Pagination
        currentPage={pendingPage ?? page}
        pages={Math.ceil((scores?.totalCount ?? 0) / pageSize)}
      />
    </div>
  );
}
