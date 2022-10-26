"use client";
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
import {} from "next";
import invariant from "tiny-invariant";

export default function PlayerScoresPage({
  params,
  searchParams,
}: {
  params?: Record<string, string>;
  searchParams?: Record<string, string | string[]>;
}) {
  invariant(params?.playerId);
  invariant(params?.category);
  const scores: PlayerScore[] = [];
  const page = parseInt(searchParams?.page?.toString() ?? "1");
  const pages = Math.ceil(scores.length / 50);

  const columns: [keyof PlayerScore | null, string, number?][] = [
    ["rank", ""],
    ["songName", "Song Name", 2],
    ["difficulty", "Difficulty"],
    ["categoryDisplayName", "Category"],
    ["accuracy", "Accuracy"],
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
              <tr key={score.songHash + score.difficulty}>
                <td>#{score.rank}</td>

                <td className="relative min-w-[2.5rem]">
                  <Image
                    src={`https://cdn.accsaber.com/covers/${score.songHash.toUpperCase()}.png`}
                    className="absolute top-0 left-0 m-0"
                    loading="lazy"
                    alt="Cover art"
                    width={40}
                    height={40}
                  />
                </td>
                <td className="max-w-[10rem] text-ellipsis whitespace-nowrap w-full overflow-hidden">
                  <Link href={`/maps/${score.leaderboardId}`}>
                    {score.songAuthorName} - {score.songName}
                  </Link>
                </td>
                <td>
                  <DifficultyLabel>{score.difficulty}</DifficultyLabel>
                </td>
                <td>{score.categoryDisplayName}</td>
                <td>
                  {(score.accuracy * 100).toLocaleString(language, {
                    maximumFractionDigits: 2,
                  })}
                  %
                </td>
                <td>
                  {score.ap.toLocaleString(language, {
                    maximumFractionDigits: 2,
                  })}
                </td>
                <td>
                  {score.weightedAp?.toLocaleString(language, {
                    maximumFractionDigits: 2,
                  })}
                </td>
                <td title={new Date(score.timeSet).toLocaleString(language)}>
                  {ms(Date.now() - new Date(score.timeSet).getTime(), {
                    long: true,
                  })}{" "}
                  ago
                </td>
                <td>
                  <Complexity>{score.complexity}</Complexity>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Pagination currentPage={page} pages={pages} />
    </div>
  );
}

export const revalidate = 120;
