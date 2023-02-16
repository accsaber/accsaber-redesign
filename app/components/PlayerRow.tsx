import { language } from "~/lib/api/config";
import type { Player } from "~/lib/interfaces/api/player";
import { NavLink } from "@remix-run/react";
import LoadingSpinner from "./LoadingSpinner";
import PlayerAvatar from "./PlayerAvatar";

const PlayerRow = ({
  player,
  current,
}: {
  player: Player;
  current?: string;
}) => {
  current ??= "overall";

  const linkTarget = `/profile/${player.playerId}/${
    current === "overall" ? "" : current
  }`;
  return (
    <tr key={player.playerId}>
      <td>#{player.rank}</td>
      <td className="relative w-10 min-w-[2.5rem]">
        <NavLink
          prefetch={"intent"}
          to={linkTarget}
          className={`flex flex-row items-center`}
        >
          {({ isPending }) => (
            <>
              <PlayerAvatar
                profile={player}
                className="absolute top-0 left-0 w-10 h-10 m-0"
                width={40}
                height={40}
                loading="lazy"
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
      <td className="w-full">
        <NavLink
          prefetch={"intent"}
          to={linkTarget}
          className={`flex flex-row items-center`}
        >
          {player.playerName}
        </NavLink>
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
};

export default PlayerRow;
