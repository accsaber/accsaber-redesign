export interface ErrorResponse {
  message: string;
  errorCode: string;
}

const apiFetch = (target: string | URL, init?: RequestInit) => {
  return fetch(new URL(target, "https://api.accsaber.com"), init);
};

// deno-lint-ignore no-explicit-any
export const isErrorResponse = (response: any): response is ErrorResponse =>
  typeof response.message == "string" && typeof response.errorCode == "string";

export const json = <T>(...params: Parameters<typeof apiFetch>) =>
  apiFetch(...params).then(
    (response) => response.json() as Promise<T | ErrorResponse>
  );

export default apiFetch;
