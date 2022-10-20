import type { Player } from "../interfaces/api/player.ts";
import useSWR from "swr";
import { json } from "../lib/fetcher.ts";

const PlayerHeader = ({ player }: { player: Player }) => {
  const { data } = useSWR(`player`, json, { fallbackData: player });

  return (
    <div>
      <pre>{JSON.stringify(data, undefined, 2)}</pre>
    </div>
  );
};

export default PlayerHeader;
