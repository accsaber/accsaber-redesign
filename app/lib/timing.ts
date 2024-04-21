
export const now = typeof performance !== "undefined" ?
  () => performance.now() :
  () => Date.now();

export const withTiming = (headers: Headers, key = "fetch", label?: string) => {
  const startTime = now();
  return <T>(data: T) => {
    headers.append(
      "Server-Timing",
      `${key};desc="${label ?? key}";dur=${now() - startTime}`
    );
    return data;
  };
};
