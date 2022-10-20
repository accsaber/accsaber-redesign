import type { Player } from "$interfaces/api/player.ts";
import type { PlayerScore } from "$interfaces/api/player-score.ts";
import { accSaberCache } from "./cache.ts";

export interface ErrorResponse {
  message: string;
  errorCode: string;
}

const apiFetch = async (target: string | URL, init?: RequestInit) => {
  const apiRequest = new Request(
    new URL(target, "https://api.accsaber.com"),
    init
  );
  const responsePromise = fetch(apiRequest.clone()).then((response) => {
    accSaberCache?.put(apiRequest, response.clone());
    return response;
  });

  return (await accSaberCache?.match(apiRequest)) ?? (await responsePromise);
};

// deno-lint-ignore no-explicit-any
export const isErrorResponse = (response: any): response is ErrorResponse =>
  typeof response.message == "string" && typeof response.errorCode == "string";

export const json = <T>(...params: Parameters<typeof apiFetch>) =>
  apiFetch(...params).then(
    (response) => response.json() as Promise<T | ErrorResponse>
  );

export const getPlayer = (userId: string, category = "overall") =>
  json<Player>(`players/${encodeURIComponent(userId)}/${category}`);

export const getPlayerScores = async (userId: string, category = "overall") => {
  const categoryString =
    category == "overall" ? "" : `/${encodeURIComponent(category)}`;
  const data = await json<PlayerScore[]>(
    `players/${encodeURIComponent(userId)}${categoryString}/scores`
  );
  return data;
};

export default apiFetch;
