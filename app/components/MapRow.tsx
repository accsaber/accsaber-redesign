import Link from "next/link";
import { language } from "~/lib/api/config";
import Complexity from "@/Complexity";
import DifficultyLabel from "@/DifficultyLabel";
import CDNImage from "@/CDNImage";
import type { MapRowFragment } from "$gql";

const MapRow = ({
  map,
  padLeft,
}: {
  map: MapRowFragment;
  padLeft?: boolean;
}) => (
  <tr>
    {padLeft ? <td /> : <></>}
    <td className="relative w-10 aspect-square">
      <CDNImage
        src={`covers/${map.songBySong?.songHash.toUpperCase()}.png`}
        className="absolute top-0 left-0 m-0"
        loading="lazy"
        alt="Cover art"
        width={40}
        height={40}
      />
    </td>

    <td className="max-w-[10rem] text-ellipsis whitespace-nowrap w-min overflow-hidden">
      <Link prefetch={"intent"} href={`/maps/${map.leaderboardId}`}>
        {map.songBySong?.songAuthorName} - {map.songBySong?.songName}
      </Link>
    </td>
    <td>
      <DifficultyLabel>{map.difficulty ?? ""}</DifficultyLabel>
    </td>
    <td>{map?.songBySong?.levelAuthorName}</td>
    <td>{map.category?.categoryDisplayName}</td>
    <td>
      <Complexity>{map.complexity}</Complexity>
    </td>
    <td>{new Date(map.dateRanked).toLocaleDateString(language)}</td>
  </tr>
);

export default MapRow;
