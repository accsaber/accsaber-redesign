import type ApiConfig from "../../interfaces/config";

const developmentConfig: ApiConfig = {
	apiURL: "https://api.accsaber-dev.ixsen.de",
	cdnURL: "https://cdn.accsaber-dev.ixsen.de",
	gqlURL: "https://graphile.accsaber-dev.ixsen.de/graphql",
	defaultLocale: "en-AU",
	isBeta: true,
};

export default developmentConfig;
