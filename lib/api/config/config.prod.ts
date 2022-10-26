import type ApiConfig from "../../interfaces/config";

const productionConfig: ApiConfig = {
  apiURL: "https://api.accsaber.com/",
  cdnURL: "https://accsaber.com/cdn/",
  imageURL: "https://images.accsaber.com/",
  redisURL: `redis://${
    "FLY_REGION" in (process?.env ?? {}) ? process?.env?.FLY_REGION + "." : ""
  }accsaber-redis.internal:6379`,
  defaultLocale: "en-AU",
  isBeta: false,
};

export default productionConfig;
