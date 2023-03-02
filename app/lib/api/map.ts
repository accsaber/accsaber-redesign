import type { RankedMap } from "../interfaces/api/ranked-map";
import apiFetcher, { client } from "./fetcher";

export const updateMapCache = async () => {
  const { data: maps } = await apiFetcher.get<RankedMap[]>(`ranked-maps`);
  const transaction = client.multi();
  for (const map of maps) {
    transaction.hSet(
      `accsaber:ranked-maps`,
      map.leaderboardId,
      JSON.stringify(map)
    );
  }
  transaction.expire(`accsaber:ranked-maps`, 86400 * 7); // expire map list after 1 week
  await transaction.exec();
};

export const getMapInfo = async (mapId: string) => {
  if (!(await client.exists(`accsaber:ranked-maps`))) await updateMapCache();
  const mapData = await client.hGet("accsaber:ranked-maps", mapId);
  return mapData ? (JSON.parse(mapData) as RankedMap) : null;
};

export const getMapList = async () => {
  updateMapCache();
  const maps = await client.hGetAll("accsaber:ranked-maps");
  return Object.values(maps).map((rawMap) => JSON.parse(rawMap) as RankedMap);
};
