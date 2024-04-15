import type { ReactNode } from "react";
import type CampaignStatus from "../interfaces/campaign/campaignStatus";

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

export const getHighestLevel = (campaignStatus: CampaignStatus[] = []) =>
  campaignStatus?.reduce(
    (current, { milestoneId, pathCleared }) =>
      pathCleared ? Math.max(milestoneId ?? 0, current) : current,
    -1
  ) ?? -1;

const PlayerName = ({
  children: name,
  campaignStatus = [],
}: {
  children: ReactNode;
  campaignStatus?: CampaignStatus[];
}) => {
  const highestLevel = getHighestLevel(campaignStatus);
  return (
    <div
      className={`max-w-[20em] overflow-hidden whitespace-nowrap text-ellipsis flex gap-2`}
    >
      {levels[highestLevel] ? (
        <img
          src={`/icons/campaign/${levels[highestLevel].icon}.webp`}
          alt={levels[highestLevel].name}
          title={levels[highestLevel].name}
          className="h-8"
        />
      ) : (
        ""
      )}
      <span>{name}</span>
    </div>
  );
};

export default PlayerName;
