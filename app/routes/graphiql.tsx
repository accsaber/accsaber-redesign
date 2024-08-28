import type { LinksFunction, MetaFunction } from "@remix-run/node";
import { lazy } from "react";
import "graphiql/graphiql.min.css";
import config from "~/lib/api/config";
import { createGraphiQLFetcher } from "@graphiql/toolkit";
import { metaV1 } from "@remix-run/v1-meta";

const GraphiQLEditor = lazy(async () => await import("graphiql"));

export const links: LinksFunction = () => [{ rel: "stylesheet", href: styles }];
export const meta: MetaFunction = (a) =>
  metaV1(a, { title: "AccSaber GraphiQL" });

export default function GraphiQLPage() {
  const fetcher =
    typeof window !== "undefined"
      ? createGraphiQLFetcher({
          url: config.gqlURL,
        })
      : () => ({});
  return (
    <div className="flex-1">
      <GraphiQLEditor fetcher={fetcher} />
    </div>
  );
}
