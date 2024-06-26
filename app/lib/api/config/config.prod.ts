import type ApiConfig from "../../interfaces/config";

const productionConfig: ApiConfig = {
  apiURL:
    typeof window !== "undefined"
      ? "https://api.accsaber.com"
      : "http://accsaber-backend.default.svc",
  campaignsURL:
    typeof window !== "undefined"
      ? "https://campaigns.accsaber.com"
      : "http://campaigns-backend.default.svc/api/",
  cdnURL: "https://cdn.accsaber.com",
  gqlURL:
    typeof process !== "undefined" && process?.env?.POSTGRAPHILE_SERVICE_HOST
      ? `http://${process.env.POSTGRAPHILE_SERVICE_HOST}/graphql`
      : "https://gql.accsaber.com/graphql",
  defaultLocale: "en-AU",
  isBeta: true,
};

export default productionConfig;
