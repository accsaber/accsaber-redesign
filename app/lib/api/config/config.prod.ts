import type ApiConfig from "../../interfaces/config";

const productionConfig: ApiConfig = {
  apiURL: "https://api.accsaber-dev.ixsen.de",
  cdnURL: "https://cdn.accsaber-dev.ixsen.de",
  gqlURL: !(typeof process !== "undefined" && process.env.FLY_REGION)
    ? "https://gql.accsaber.com/"
    : "http://accsaber-gql.internal:4000/",
  defaultLocale: "en-AU",
  isBeta: true,
};

export default productionConfig;
