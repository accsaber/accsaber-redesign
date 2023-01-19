import CDNImage from "@/CDNImage";
import DifficultyLabel from "@/DifficultyLabel";
import Link from "next/link";
import { RankedMap } from "~/lib/interfaces/api/ranked-map";

const MapResult = ({ map }: { map: RankedMap }) => (
  <Link
    href={`/maps/${map.leaderboardId}`}
    className={[
      "hover:bg-neutral-100",
      "dark:hover:bg-neutral-800",
      "rounded-2xl",
      "p-4",
      "flex",
      "gap-4",
      "text-neutral-800",
      "dark:text-neutral-200",
    ].join(" ")}
  >
    <CDNImage
      src={`covers/${map.songHash.toUpperCase()}.png`}
      width={80}
      height={80}
      className="w-20 h-20 shadow-md rounded-xl"
      loading="lazy"
    />
    <div className="flex flex-col justify-center ">
      <div className="text-2xl">
        {map.songAuthorName} - {map.songName} <small>{map.songSubName}</small>
      </div>
      <div className="flex gap-2 text-xl">
        <DifficultyLabel>{map.difficulty}</DifficultyLabel>
        <span className="opacity-70">{map.levelAuthorName}</span>
      </div>
    </div>
  </Link>
);

export default MapResult;
