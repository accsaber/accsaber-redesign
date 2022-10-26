import Link from "next/link";
import { language } from "~/lib/api/config";
import { RankedMap } from "~/lib/interfaces/api/ranked-map";
import Complexity from "./Complexity";
import DifficultyLabel from "./DifficultyLabel";

const MapRow = ({ map, padLeft }: { map: RankedMap; padLeft?: boolean }) => (
  <tr key={map.songHash + map.difficulty}>
    {padLeft ? <td /> : <></>}
    <td className="relative w-10 aspect-square">
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
      <Link href={`/maps/${map.leaderboardId}`}>
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
