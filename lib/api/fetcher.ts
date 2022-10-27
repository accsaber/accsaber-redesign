import type { Player } from "$interfaces/api/player";
import type { PlayerScore } from "$interfaces/api/player-score";
import useSWR from "swr";

export interface ErrorResponse {
  message: string;
  errorCode: string;
}

const apiFetch = async (target: string | URL, init?: RequestInit) => {
  const url = new URL(target, "https://api.accsaber.com");
  console.time(`fetch ${url}`);
  const apiRequest = new Request(url, init);
  return fetch(apiRequest).then((response) => {
    console.timeEnd(`fetch ${url}`);
    return response;
  });
};

// deno-lint-ignore no-explicit-any
export const isErrorResponse = (response: any): response is ErrorResponse =>
  typeof response.message == "string" && typeof response.errorCode == "string";

export const json = <T>(...params: Parameters<typeof apiFetch>) =>
  apiFetch(...params).then((response) => {
    if ("errorCode" in response) throw response;
    return response.json() as Promise<T>;
  });

export const getPlayer = (userId: string, category = "overall") =>
  json<Player>(`players/${encodeURIComponent(userId)}/${category}`);

export default apiFetch;
