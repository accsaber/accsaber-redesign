import type ApiConfig from "../../interfaces/config";

const developmentConfig: ApiConfig = {
  apiURL: "https://api.accsaber.com/",
  cdnURL: "https://accsaber.com/cdn",
  imageURL: "http://localhost:8080/",
  redisURL: "redis://test:test@127.0.0.1:6379",
  defaultLocale: "en-AU",
  isBeta: true,
};

export default developmentConfig;
