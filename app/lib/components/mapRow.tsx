import { Link } from "@remix-run/react";
import type { RankedMap } from "../interfaces/api/ranked-map";
import Complexity from "./complexity";
import DifficultyLabel from "./difficultyLabel";

const MapRow = ({ map, padLeft }: { map: RankedMap; padLeft?: boolean }) => (
  <tr key={map.songHash + map.difficulty}>
    {padLeft ? <td /> : <></>}
    <td className="relative aspect-square w-10">
      <picture>
        <source
          srcSet={`/maps/${map.leaderboardId}.thumbnail.avif`}
          type="image/avif"
        />
        <source
          srcSet={`/maps/${map.leaderboardId}.thumbnail.webp`}
          type="image/webp"
        />
        <img
          src={`/maps/${map.leaderboardId}.thumbnail.jpeg`}
          alt={``}
          loading="lazy"
          className="absolute top-0 left-0 m-0"
        />
      </picture>
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
  </tr>
);

export default MapRow;
