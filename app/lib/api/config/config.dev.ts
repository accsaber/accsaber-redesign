import type ApiConfig from "../../interfaces/config";

const developmentConfig: ApiConfig = {
  apiURL: "https://api.accsaber.com",
  campaignsURL: "https://campaigns.accsaber.com",
  cdnURL: "https://cdn.accsaber.com",
  gqlURL: "https://gql.accsaber.com/graphql",
  defaultLocale: "en-AU",
  isBeta: true,
};

export default developmentConfig;
