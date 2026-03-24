import type ApiConfig from "../../interfaces/config";

const productionConfig: ApiConfig = {
  apiURL: "https://accsaber.com/api/",
  campaignsURL: "https://campaigns.h2.accsaber.com",
  cdnURL: "https://accsaber.com/media/",
  publicURL: "https://cdn.accsaber.com/_frontend",
  gqlURL: "https://gql.h2.accsaber.com/graphql",
  defaultLocale: "en-AU",
  isBeta: false,
};

export default productionConfig;
