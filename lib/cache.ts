export const accSaberCache =
  typeof caches !== "undefined" ? await caches.open("accsaber") : undefined;
