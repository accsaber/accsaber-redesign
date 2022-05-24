import ApiConfig from "../../interfaces/config";

const productionConfig: ApiConfig = {
  apiURL: "https://api.accsaber.com/",
  cdnURL: "https://accsaber.com/cdn",
  imageURL: "https://images.accsaber.com/",
  redisURL:
    typeof "process" !== "undefined"
      ? process?.env["FLY_REDIS_CACHE_URL"] ?? ""
      : "",
  defaultLocale: "en-AU",
  isBeta: false,
};

export default productionConfig;
