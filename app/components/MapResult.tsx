import DifficultyLabel from "@/DifficultyLabel";
import Link from "next/link";
import type { RankedMap } from "~/lib/interfaces/api/ranked-map";
import MapCover from "./MapCover";

const MapResult = ({
  map,
  onClick,
}: {
  map: RankedMap;
  onClick?: Parameters<typeof Link>["0"]["onClick"];
}) => (
  <Link
    href={`/maps/${map.leaderboardId}`}
    className={[
      "hover:bg-neutral-100",
      "dark:hover:bg-neutral-800",
      "p-4",
      "flex items-center",
      "gap-3",
      "text-neutral-800",
      "dark:text-neutral-200",
    ].join(" ")}
    onClick={onClick}
  >
    <MapCover
      songHash={map.songHash}
      width={56}
      height={56}
      className="w-14 h-14 shadow-md rounded-xl"
      loading="lazy"
    />
    <div className="flex flex-col justify-center ">
      <div className="text-xl">
        {map.songAuthorName} - {map.songName} <small>{map.songSubName}</small>
      </div>
      <div className="text-lg">
        <DifficultyLabel>{map.difficulty}</DifficultyLabel>{" "}
        <span className="opacity-70">{map.levelAuthorName}</span>
      </div>
    </div>
  </Link>
);

export default MapResult;
