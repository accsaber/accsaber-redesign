import appConfig, { language } from "$lib/config.ts";
import type { Player } from "$interfaces/api/player.ts";
import { resize } from "../lib/cdn.ts";
import Img, { Size } from "./Image.tsx";

const PlayerRow = ({
  player,
  current,
}: {
  player: Player;
  current?: string;
}) => (
  <tr key={player.playerId}>
    <td>#{player.rank}</td>
    <td className="relative w-10 h-10 m-0 flex">
      <Img
        size={Size.THUMBNAIL}
        src={player.avatarUrl}
        loading={"lazy"}
        className="object-cover absolute top-0 left-0 w-10 h-10 mt-0"
        style={{ margin: 0 }}
      />
    </td>
    <td className="w-full pl-2">
      <a href={`/profile/${player.playerId}/${current ?? "overall"}/scores`}>
        {player.playerName}
      </a>
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
    <td className="hidden md:table-cell whitespace-nowrap">{player.hmd}</td>
  </tr>
);

export default PlayerRow;
