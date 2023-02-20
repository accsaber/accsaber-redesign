import type { LinksFunction, MetaFunction } from "@remix-run/node";
import { lazy } from "react";
import styles from "graphiql/graphiql.min.css";
import config from "~/lib/api/config";
import { createGraphiQLFetcher } from "@graphiql/toolkit";

const GraphiQLEditor = lazy(async () => await import("graphiql"));

export const links: LinksFunction = () => [{ rel: "stylesheet", href: styles }];
export const meta: MetaFunction = () => ({ title: "AccSaber GraphiQL" });

export default function GraphiQLPage() {
  const fetcher =
    typeof window !== "undefined"
      ? createGraphiQLFetcher({
          url: config.gqlURL,
        })
      : () => ({});
  return <GraphiQLEditor fetcher={fetcher} />;
}
