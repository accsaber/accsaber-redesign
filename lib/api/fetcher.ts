import type { Player } from "$interfaces/api/player";
import { cache } from "react";
import config from "./config";

export interface ErrorResponse {
  message: string;
  errorCode: string;
}

const apiFetch = async (target: string | URL, init?: RequestInit) => {
  return fetch(new URL(target, config.apiURL), {
    next: { revalidate: 60 * 5 },
    ...init,
  });
};

export const isErrorResponse = (response: any): response is ErrorResponse =>
  typeof response.message == "string" && typeof response.errorCode == "string";

export const json = cache(<T>(target: string) =>
  apiFetch(target).then(async (response) => {
    const data = (await response.json()) as T | ErrorResponse;
    if (isErrorResponse(data) || response.status >= 400) throw data;
    else return data;
  })
);

export const getPlayer = (userId: string, category = "overall") =>
  json<Player>(`players/${encodeURIComponent(userId)}/${category}`);

export default apiFetch;
