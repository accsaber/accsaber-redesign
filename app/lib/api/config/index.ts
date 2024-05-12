import developmentConfig from "./config.dev";
import productionConfig from "./config.prod";

const config =
  process.env.NODE_ENV === "production" ? productionConfig : developmentConfig;
export default config;

export const language =
  typeof document === "undefined" ? config.defaultLocale : navigator.language;

export const getDSN = () => {
  if (typeof process !== "undefined") return process.env.SENTRY_DSN;
  if (typeof document !== "undefined")
    return (
      document
        .querySelector("meta[name=sentry-dsn]")
        ?.getAttribute("content") || undefined
    );
};
