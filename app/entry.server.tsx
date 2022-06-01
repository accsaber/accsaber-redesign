import type { EntryContext } from "@remix-run/node";
import { RemixServer } from "@remix-run/react";
import { renderToString } from "react-dom/server";
import { gzipSync, brotliCompressSync, deflateSync } from "zlib";

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

  responseHeaders.set("Content-Type", "text/html");

  const supportedEncoding =
    request.headers.get("accept-encoding")?.split(/, */) ?? [];

  output = markup;

  if (supportedEncoding.includes("br")) {
    output = brotliCompressSync(markup);
    responseHeaders.set("content-encoding", "br");
  }

  return new Response(output, {
    status: responseStatusCode,
    headers: responseHeaders,
  });
}
