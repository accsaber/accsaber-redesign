import { Link } from "@remix-run/react";
import { language } from "../api/config";
import type { Player } from "../interfaces/api/player";

const PlayerRow = ({
  player,
  current,
}: {
  player: Player;
  current?: string;
}) => (
  <tr key={player.playerId}>
    <td>#{player.rank}</td>
    <td className="relative aspect-square w-10">
      <picture>
        <source
          srcSet={`/profile/${player.playerId}.thumbnail.avif`}
          type="image/avif"
        />
        <source
          srcSet={`/profile/${player.playerId}.thumbnail.webp`}
          type="image/webp"
        />
        <img
          src={`/profile/${player.playerId}.thumbnail.jpeg`}
          alt={`${player.playerName}'s profile`}
          loading="lazy"
          className="absolute top-0 left-0 m-0"
        />
      </picture>
    </td>
    <td>
      <Link
        to={`/profile/${player.playerId}/${current ?? "overall"}/scores`}
        prefetch="intent"
      >
        {player.playerName}
      </Link>
    </td>
    <td>
      {player.ap.toLocaleString(language, {
        maximumFractionDigits: 2,
      })}
    </td>
    <td>
      {(player.averageAcc * 100).toLocaleString(language, {
        maximumFractionDigits: 2,
      })}
      %
    </td>
    <td>{player.rankedPlays}</td>
    <td>
      {player.averageApPerMap.toLocaleString(language, {
        maximumFractionDigits: 2,
      })}
    </td>
    <td>{player.hmd}</td>
  </tr>
);

export default PlayerRow;
