import type ApiConfig from "$interfaces/config.ts";

const appConfig: ApiConfig = {
  apiURL: "https://api.accsaber.com/",
  cdnURL: "https://accsaber.com/cdn/",
  imageURL: "http://localhost:8080/",
  redisURL: "redis://127.0.0.1:6379",
  defaultLocale: "en-AU",
  isBeta: true,
};

export const language =
  typeof document == "undefined" ? appConfig.defaultLocale : navigator.language;

export default appConfig;
