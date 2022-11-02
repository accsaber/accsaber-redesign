import { use } from "react";
import Image from "next/image";
import getCampaignStatus, { getHighestLevel } from "~/lib/api/campaign";
import { Player } from "~/lib/interfaces/api/player";

import champIcon from "~/public/icons/campaign/champ.webp";
import elderIcon from "~/public/icons/campaign/elder.webp";
import godIcon from "~/public/icons/campaign/god.webp";
import mercenaryIcon from "~/public/icons/campaign/mercenary.webp";

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

const PlayerName = ({ children: player }: { children: Player }) => {
  const campaignStatus = use(getCampaignStatus(player.playerId));
  const highestLevel = getHighestLevel(campaignStatus);
  return (
    <div
      className={`max-w-[20em] overflow-hidden whitespace-nowrap text-ellipsis flex gap-2`}
    >
      {levels[highestLevel] ? (
        <Image
          src={levels[highestLevel].icon}
          alt={levels[highestLevel].name}
          title={levels[highestLevel].name}
          className="object-contain h-8"
          width={32}
          height={32}
        />
      ) : (
        ""
      )}
      <span>{player.playerName}</span>
    </div>
  );
};

export default PlayerName;
