import Link from "next/link";
import { language } from "~/lib/api/config";
import Complexity from "@/Complexity";
import DifficultyLabel from "@/DifficultyLabel";
import type { MapRowFragment } from "$gql";
import MapCover from "./MapCover";

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
      <MapCover
        songHash={map.song?.songHash ?? ""}
        loading="lazy"
        width={40}
        className="absolute top-0 left-0 m-0"
        height={40}
      />
    </td>

    <td className="max-w-[10rem] text-ellipsis whitespace-nowrap w-min overflow-hidden">
      <Link prefetch={"intent"} href={`/maps/${map.leaderboardId}`}>
        {map.song?.songAuthorName} - {map.song?.songName}
      </Link>
    </td>
    <td>
      <DifficultyLabel>{map.difficulty ?? ""}</DifficultyLabel>
    </td>
    <td>{map?.song?.levelAuthorName}</td>
    <td>{map.category?.categoryDisplayName}</td>
    <td>
      <Complexity>{map.complexity}</Complexity>
    </td>
    <td>{new Date(map.dateRanked).toLocaleDateString(language)}</td>
  </tr>
);

export default MapRow;
