import type { Player } from "~/lib/interfaces/api/player";

import champIcon from "~icons/campaign/champ.webp";
import elderIcon from "~icons/campaign/elder.webp";
import godIcon from "~icons/campaign/god.webp";
import mercenaryIcon from "~icons/campaign/mercenary.webp";

const levels = [
  {
    name: "Mercenary",
    icon: mercenaryIcon,
  },
  {
    name: "Champ",
    icon: champIcon,
  },
  {
    name: "Elder",
    icon: elderIcon,
  },
  { name: "God", icon: godIcon },
  { name: "Celestial", icon: godIcon },
];

const PlayerName = ({
  children: player,
  highestLevel,
}: {
  children: Player;
  highestLevel: number;
}) => {
  return (
    <div
      className={
        "max-w-[20em] overflow-hidden whitespace-nowrap text-ellipsis flex gap-2 items-center flex-shrink-0 min-w-max mt-0.5"
      }
    >
      {levels[highestLevel] ? (
        <img
          src={levels[highestLevel].icon}
          alt={levels[highestLevel].name}
          title={levels[highestLevel].name}
          className="object-contain h-8"
          width={32}
          height={32}
        />
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-8 h-8 opacity-50"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 7.5l-2.25-1.313M21 7.5v2.25m0-2.25l-2.25 1.313M3 7.5l2.25-1.313M3 7.5l2.25 1.313M3 7.5v2.25m9 3l2.25-1.313M12 12.75l-2.25-1.313M12 12.75V15m0 6.75l2.25-1.313M12 21.75V19.5m0 2.25l-2.25-1.313m0-16.875L12 2.25l2.25 1.313M21 14.25v2.25l-2.25 1.313m-13.5 0L3 16.5v-2.25"
          />
        </svg>
      )}
      {player.playerName.startsWith("ACC |") && (
        <>
          <div>ACC</div>
          <div className="w-px h-8 font-normal bg-current opacity-50" />
        </>
      )}
      <div
        className={
          highestLevel >= 0
            ? "text-black dark:text-transparent dark:bg-gradient-to-br from-green-600 to-blue-500 dark:from-green-500 dark:to-blue-500 dark:bg-clip-text"
            : "text-black"
        }
      >
        {player.playerName.replace(/^ACC \|/, "")}
      </div>
    </div>
  );
};

export default PlayerName;
