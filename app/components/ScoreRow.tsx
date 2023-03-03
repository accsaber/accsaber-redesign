import Link from "next/link";
import Complexity from "@/Complexity";
import DifficultyLabel from "@/DifficultyLabel";
import { language } from "~/lib/api/config";
import ScoreHistoryButton from "./ScoreHistoryButton";
import { DateTime } from "luxon";
import type { ScoreRowFragment } from "$gql";
import LoadingSpinner from "./LoadingSpinner";
import { NavLink } from "@remix-run/react";
import MapCover from "./MapCover";

export default function ScoreRow({
  score,
  playerId,
}: {
  score: ScoreRowFragment;
  playerId: string;
}) {
  return (
    <tr>
      <td>#{score.ranking}</td>

      <td className="relative min-w-[2.5rem]">
        <NavLink
          prefetch={"intent"}
          to={`/maps/${score.leaderboardId}`}
          aria-label={score.songName ?? ""}
        >
          {({ isPending }) => (
            <>
              <MapCover
                songHash={score.songHash ?? ""}
                loading="lazy"
                width={40}
                className="absolute top-0 left-0 m-0"
                height={40}
                alt={score.songName ?? ""}
              />
              {isPending && (
                <div className="absolute top-0 left-0 w-10 h-10 flex bg-white/80 dark:bg-black/50">
                  <LoadingSpinner className="p-2 w-10 h-10" />
                </div>
              )}
            </>
          )}
        </NavLink>
      </td>
      <td className="max-w-[10rem] text-ellipsis whitespace-nowrap w-full overflow-hidden">
        <Link prefetch={"intent"} href={`/maps/${score.leaderboardId}`}>
          {score.songAuthorName} - {score.songName}
        </Link>
      </td>
      <td>
        <DifficultyLabel>{score.difficulty ?? ""}</DifficultyLabel>
      </td>
      <td>{score.categoryDisplayName}</td>
      <td>
        {((score.accuracy ?? NaN) * 100).toLocaleString(language, {
          maximumFractionDigits: 2,
        })}
        %
      </td>
      <td>
        <ScoreHistoryButton score={score} playerId={playerId} />
      </td>
      <td>
        {score.ap?.toLocaleString(language, {
          maximumFractionDigits: 2,
        })}
      </td>
      <td>
        {score.weightedAp?.toLocaleString(language, {
          maximumFractionDigits: 2,
        })}
      </td>
      <td title={new Date(score.timeSet).toLocaleString(language)}>
        {DateTime.fromISO(score.timeSet).toRelative()}
      </td>
      <td>
        <Complexity>{score?.complexity ?? 0}</Complexity>
      </td>
    </tr>
  );
}
