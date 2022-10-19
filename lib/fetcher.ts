import { accSaberCache } from "./cache.ts";

export interface ErrorResponse {
  message: string;
  errorCode: string;
}

const apiFetch = async (target: string | URL, init?: RequestInit) => {
  const req = new Request(new URL(target, "https://api.accsaber.com"), init);
  // Check if there's a matching
  const cachedResponse = await accSaberCache.match(req.clone());

  console.log(`Cache ${cachedResponse ? "HIT" : "MISS"} for ${target}`);

  const apiRequest = fetch(req).then((response) => {
    accSaberCache.put(req, response.clone());

    return response;
  });

  return cachedResponse ?? (await apiRequest);
};

// deno-lint-ignore no-explicit-any
export const isErrorResponse = (response: any): response is ErrorResponse =>
  typeof response.message == "string" && typeof response.errorCode == "string";

export const json = <T>(...params: Parameters<typeof apiFetch>) =>
  apiFetch(...params).then(
    (response) => response.json() as Promise<T | ErrorResponse>
  );

export default apiFetch;
