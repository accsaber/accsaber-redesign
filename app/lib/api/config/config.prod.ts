import type ApiConfig from "../../interfaces/config";

const productionConfig: ApiConfig = {
  apiURL: "https://api.accsaber.com/",
  cdnURL: "https://accsaber.com/cdn/",
  imageURL: "https://images.accsaber.com/",
  redisURL: process.env?.REDIS_URL ?? "nearest.accsaber-redis.internal",
  defaultLocale: "en-AU",
  isBeta: false,
};

export default productionConfig;
