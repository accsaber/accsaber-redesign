import type { EntryContext } from "@remix-run/node";
import { RemixServer } from "@remix-run/react";
import { renderToString } from "react-dom/server";

export default function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext
) {
  let markup =
    `<!doctype html>` +
    renderToString(<RemixServer context={remixContext} url={request.url} />);

  let output: string | Uint8Array;

  responseHeaders.set("Content-Type", "text/html; charset=utf-8");
  responseHeaders.set(
    "strict-transport-security",
    "max-age=63072000; includeSubDomains; preload"
  );
  responseHeaders.set("x-content-type-options", "nosniff");
  responseHeaders.set(
    "cache-control",
    "max-age=300, stale-while-revalidate=7200"
  );
  responseHeaders.set("referrer-policy", "strict-origin");
  responseHeaders.set(
    "permissions-policy",
    "geolocation=(), microphone=(), camera=()"
  );
  responseHeaders.set("x-xss-protection", "1; mode=block");

  output = markup;

  return new Response(output, {
    status: responseStatusCode,
    headers: responseHeaders,
  });
}
