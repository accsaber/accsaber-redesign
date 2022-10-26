import { ReactNode, use } from "react";
import type CampaignStatus from "$interfaces/campaign/campaignStatus";
import Image from "next/image";
import getCampaignStatus, { getHighestLevel } from "~/lib/api/campaign";
import { Player } from "~/lib/interfaces/api/player";

const levels = [
  {
    name: "Mercenary",
    icon: "mercenary",
  },
  {
    name: "Champ",
    icon: "champ",
  },
  {
    name: "Elder",
    icon: "elder",
  },
  { name: "God", icon: "god" },
  { name: "Celestial", icon: "celestial" },
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
          src={`/icons/campaign/${levels[highestLevel].icon}.webp`}
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
