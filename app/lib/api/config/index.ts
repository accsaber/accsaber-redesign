import developmentConfig from "./config.dev";
import productionConfig from "./config.prod";

const config =
  process.env.NODE_ENV == "production" ? productionConfig : developmentConfig;
export default config;

export const language =
  typeof document == "undefined" ? config.defaultLocale : navigator.language;
