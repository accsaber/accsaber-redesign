import Link from "next/link";
import { use } from "react";
import Complexity from "~/app/Components/Complexity";
import DifficultyLabel from "~/app/Components/DifficultyLabel";
import Pagination from "~/app/Components/Pagination";
import SortButton from "~/app/Components/SortButton";
import { language } from "~/lib/api/config";
import ms from "ms";
import { PlayerScore } from "~/lib/interfaces/api/player-score";
import Image from "next/image";
import invariant from "tiny-invariant";
import getPlayerScores from "~/lib/api/scores";
import { json } from "~/lib/api/fetcher";
import ScoreRow from "../../Components/ScoreRow";

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

  const allScores = use(
    getPlayerScores(
      params.playerId,
      params.category,
      searchParams?.sortBy?.toString() as keyof PlayerScore
    )
  );

  const page = parseInt(searchParams?.page?.toString() ?? "1");
  const pages = Math.ceil(allScores.length / 50);
  const scores =
    allScores.length > pageSize
      ? [...allScores].splice(pageSize * (page - 1), pageSize)
      : allScores;

  const columns: [keyof PlayerScore | null, string, number?][] = [
    ["rank", ""],
    ["songName", "Song Name", 2],
    ["difficulty", "Difficulty"],
    ["categoryDisplayName", "Category"],
    ["accuracy", "Accuracy"],
    [null, ""],
    ["ap", "AP"],
    ["weightedAp", "Weighted"],
    ["timeSet", "Time Set"],
    ["complexity", "Complexity"],
  ];

  return (
    <div className="flex flex-col gap-8">
      <Pagination currentPage={page} pages={pages} />
      <div className="w-full max-w-full overflow-x-auto overflow-y-hidden prose dark:prose-invert">
        <table className="overflow-auto whitespace-nowrap">
          <thead>
            <tr>
              {columns.map(([value, friendly, colSpan], n) => (
                <th key={n} colSpan={colSpan}>
                  {value ? (
                    <SortButton name="sortBy" value={value}>
                      {friendly}
                    </SortButton>
                  ) : (
                    friendly
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {scores.map((score) => (
              <ScoreRow
                playerId={params.playerId}
                score={score}
                key={score.songHash + score.difficulty}
              />
            ))}
          </tbody>
        </table>
      </div>
      <Pagination currentPage={page} pages={pages} />
    </div>
  );
}

export const revalidate = 120;
