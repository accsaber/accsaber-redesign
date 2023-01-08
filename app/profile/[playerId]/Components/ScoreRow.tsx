import Link from "next/link";
import Complexity from "~/app/Components/Complexity";
import DifficultyLabel from "~/app/Components/DifficultyLabel";
import { language } from "~/lib/api/config";
import ScoreHistoryButton from "./ScoreHistoryButton";
import { DateTime } from "luxon";
import CDNImage from "@/CDNImage";
import { ScoreRowFragment } from "~/lib/__generated__/gql";

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
        <CDNImage
          src={`covers/${score.songHash?.toUpperCase()}.png`}
          className="absolute top-0 left-0 m-0"
          loading="lazy"
          alt="Cover art"
          width={40}
          height={40}
        />
      </td>
      <td className="max-w-[10rem] text-ellipsis whitespace-nowrap w-full overflow-hidden">
        <Link prefetch={false} href={`/maps/${score.leaderboardId}`}>
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
