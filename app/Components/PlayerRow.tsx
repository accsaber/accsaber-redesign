import Image from "next/image";
import Link from "next/link";
import { language } from "~/lib/api/config";
import { Player } from "~/lib/interfaces/api/player";

const PlayerRow = ({
  player,
  current,
}: {
  player: Player;
  current?: string;
}) => (
  <tr key={player.playerId}>
    <td>#{player.rank}</td>
    <td className="relative w-10 min-w-[2.5rem]">
      <Image
        src={player.avatarUrl}
        alt={`${player.playerName}'s profile`}
        loading="lazy"
        className="absolute top-0 left-0 w-10 h-10 m-0"
        width={40}
        height={40}
      />
    </td>
    <td className="w-full">
      <Link href={`/profile/${player.playerId}/${current ?? "overall"}/scores`}>
        {player.playerName}
      </Link>
    </td>
    <td>
      {player.ap.toLocaleString(language, {
        maximumFractionDigits: 2,
      })}
    </td>
    <td className="hidden md:table-cell">
      {(player.averageAcc * 100).toLocaleString(language, {
        maximumFractionDigits: 2,
      })}
      %
    </td>
    <td className="hidden md:table-cell">{player.rankedPlays}</td>
    <td className="hidden md:table-cell">
      {player.averageApPerMap.toLocaleString(language, {
        maximumFractionDigits: 2,
      })}
    </td>
    <td className="hidden md:table-cell whitespace-nowrap">
      {player.hmd?.toString()}
    </td>
  </tr>
);

export default PlayerRow;
