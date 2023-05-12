import type ApiConfig from "../../interfaces/config";

const productionConfig: ApiConfig = {
  apiURL: !(typeof process !== "undefined" && process.env.FLY_REGION)
    ? "https://accsaber-backend.fly.dev/"
    : "http://accsaber-backend.internal:8080/",
  cdnURL: "https://cdn.accsaber-dev.ixsen.de",
  gqlURL: !(typeof process !== "undefined" && process.env.FLY_REGION)
    ? "https://gql.accsaber.com/"
    : "http://accsaber-gql.internal:4000/",
  defaultLocale: "en-AU",
  isBeta: true,
};

export default productionConfig;
