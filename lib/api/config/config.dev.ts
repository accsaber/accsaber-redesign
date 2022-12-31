import type ApiConfig from "../../interfaces/config";

const developmentConfig: ApiConfig = {
	apiURL: "http://localhost:8080/",
	cdnURL: "https://cdn.accsaber.com/",
	gqlURL: "http://localhost:4000/graphql",
	defaultLocale: "en-AU",
	isBeta: true,
};

export default developmentConfig;
