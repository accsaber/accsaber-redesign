import Link from "next/link";
import { language } from "~/lib/api/config";
import { RankedMap } from "~/lib/interfaces/api/ranked-map";
import Complexity from "~/app/Components/Complexity";
import DifficultyLabel from "~/app/Components/DifficultyLabel";
import Image from "next/image";

const MapRow = ({ map, padLeft }: { map: RankedMap; padLeft?: boolean }) => (
  <tr key={map.songHash + map.difficulty}>
    {padLeft ? <td /> : <></>}
    <td className="relative w-10 aspect-square">
      <Image
        src={`https://cdn.accsaber.com/covers/${map.songHash.toUpperCase()}.png`}
        className="absolute top-0 left-0 m-0"
        loading="lazy"
        alt="Cover art"
        width={40}
        height={40}
      />
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
