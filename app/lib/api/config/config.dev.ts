import type ApiConfig from "../../interfaces/config";

const developmentConfig: ApiConfig = {
  apiURL: "https://api.accsaber-dev.ixsen.de",
  cdnURL: "https://cdn.accsaber-dev.ixsen.de",
  gqlURL: "https://gql.accsaber.com/graphql",
  defaultLocale: "en-AU",
  isBeta: true,
};

export default developmentConfig;
