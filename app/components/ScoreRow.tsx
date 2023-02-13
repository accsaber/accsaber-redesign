import Link from "next/link";
import Complexity from "@/Complexity";
import DifficultyLabel from "@/DifficultyLabel";
import { language } from "~/lib/api/config";
import ScoreHistoryButton from "./ScoreHistoryButton";
import { DateTime } from "luxon";
import CDNImage from "@/CDNImage";
import type { ScoreRowFragment } from "$gql";
import LoadingSpinner from "./LoadingSpinner";
import { NavLink } from "@remix-run/react";

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
        <NavLink prefetch={"intent"} to={`/maps/${score.leaderboardId}`}>
          {({ isPending }) => (
            <>
              <CDNImage
                src={`covers/${score.songHash?.toUpperCase()}.png`}
                className="absolute top-0 left-0 m-0"
                loading="lazy"
                alt="Cover art"
                width={40}
                height={40}
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
