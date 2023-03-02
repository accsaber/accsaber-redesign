import { Link } from "@remix-run/react";
import { language } from "../api/config";
import type { RankedMap } from "../interfaces/api/ranked-map";
import Complexity from "./complexity";
import DifficultyLabel from "./difficultyLabel";
import CDNImage from "./CDNImage";

const MapRow = ({ map, padLeft }: { map: RankedMap; padLeft?: boolean }) => (
  <tr key={map.songHash + map.difficulty}>
    {padLeft ? <td /> : <></>}
    <td className="relative aspect-square w-10">
      <CDNImage
        src={`covers/${map.songHash.toUpperCase()}.png`}
        width={40}
        className="absolute top-0 left-0 m-0"
        height={40}
        loading="lazy"
      />
    </td>
    <td className="max-w-[10rem] text-ellipsis whitespace-nowrap w-min overflow-hidden">
      <Link to={`/maps/${map.leaderboardId}`}>
        {map.songAuthorName} - {map.songName}
      </Link>
    </td>
    <td>
      <DifficultyLabel>{map.difficulty}</DifficultyLabel>
    </td>
    <td>{map.levelAuthorName}</td>
    <td>{map.categoryDisplayName}</td>
    <td>
      <Complexity>{map.complexity}</Complexity>
    </td>
    <td>{new Date(map.dateRanked).toLocaleDateString(language)}</td>
  </tr>
);

export default MapRow;
