import type { Player } from "$interfaces/api/player";
import type { PlayerScore } from "$interfaces/api/player-score";
import useSWR from "swr";

export interface ErrorResponse {
  message: string;
  errorCode: string;
}

const apiFetch = async (target: string | URL, init?: RequestInit) => {
  const apiRequest = new Request(
    new URL(target, "https://api.accsaber.com"),
    init
  );
  return fetch(apiRequest);
};

export const isErrorResponse = (response: any): response is ErrorResponse =>
  typeof response.message == "string" && typeof response.errorCode == "string";

export const json = <T>(...params: Parameters<typeof apiFetch>) =>
  apiFetch(...params).then(async (response) => {
    const data = (await response.json()) as T | ErrorResponse;
    if (isErrorResponse(data)) throw data;
    else return data;
  });

export const getPlayer = (userId: string, category = "overall") =>
  json<Player>(`players/${encodeURIComponent(userId)}/${category}`);

export default apiFetch;
