import type { RankedMap } from "../interfaces/api/ranked-map";
import { getJSON } from "./fetcher";

export const getMapInfo = async (mapId: string) =>
  getJSON<RankedMap>(`ranked-maps/${mapId}`);

export const getMapList = () => getJSON<RankedMap[]>("ranked-maps");
