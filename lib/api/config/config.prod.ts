import type ApiConfig from "../../interfaces/config";

const productionConfig: ApiConfig = {
	apiURL: "https://api.accsaber.com/",
	cdnURL: "https://cdn.accsaber.com/",
	gqlURL: "https://gql.accsaber.com/graphql",
	defaultLocale: "en-AU",
	isBeta: true,
};

export default productionConfig;
