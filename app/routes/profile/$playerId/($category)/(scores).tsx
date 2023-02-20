import type { PlayerScoresPageQuery } from "$gql";
import { AccSaberScoresOrderBy, PlayerScoresPageDocument } from "$gql";
import BlankBlock from "@/BlankBlock";
import GQLSortButton from "@/GQLSortButton";
import Pagination from "@/Pagination";
import ScoreRow from "@/ScoreRow";
import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData, useNavigation } from "@remix-run/react";
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

const { now } = typeof performance !== "undefined" ? performance : Date;

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
  headers.append("Cache-Control", "max-age=60, stale-while-revalidate=6400");
  const started = now();

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

  const { state } = useNavigation();

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
          {state === "loading" ? (
            <ScoreLoadingPage />
          ) : (
            <tbody>
              {scores?.nodes.map((score) => (
                <ScoreRow
                  playerId={playerId}
                  score={score}
                  key={score.scoreId}
                />
              ))}
            </tbody>
          )}
        </table>
      </div>
      <Pagination
        currentPage={page}
        pages={Math.ceil((scores?.totalCount ?? 0) / pageSize)}
      />
    </div>
  );
}

const ScoreLoadingPage = () => {
  return (
    <tbody>
      {new Array(pageSize).fill(0).map((_i, n) => (
        <tr key={n}>
          <td>
            <BlankBlock width={"1.5rem"} />
          </td>
          <td className="w-full" colSpan={2}>
            <BlankBlock
              width={`${
                (Math.abs(Math.sin(n * Math.sqrt(5)) * 50) % 50) + 50
              }%`}
            />
          </td>
          <td>
            <BlankBlock width={"3rem"} />
          </td>
          <td>
            <BlankBlock width={`${(Math.sin(n) + 2) * 2}rem`} />
          </td>
          <td colSpan={2}>
            <BlankBlock width={"3rem"} />
          </td>
          <td>
            <BlankBlock width={"2rem"} />
          </td>
          <td>
            <BlankBlock width={"3rem"} />
          </td>
          <td>
            <BlankBlock width={"4rem"} />
          </td>
          <td>
            <BlankBlock width={"3rem"} />
          </td>
        </tr>
      ))}
    </tbody>
  );
};
