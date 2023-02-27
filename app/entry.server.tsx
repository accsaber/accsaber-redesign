import { PassThrough } from "stream";
import type { EntryContext } from "@remix-run/cloudflare";
import { Response } from "@remix-run/cloudflare";
import { RemixServer } from "@remix-run/react";
import isbot from "isbot";
import { renderToReadableStream } from "react-dom/server";

const ABORT_DELAY = 5000;

export default function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext
) {
  return isbot(request.headers.get("user-agent"))
    ? handleBotRequest(
        request,
        responseStatusCode,
        responseHeaders,
        remixContext
      )
    : handleBrowserRequest(
        request,
        responseStatusCode,
        responseHeaders,
        remixContext
      );
}

async function handleBotRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext
) {
  const stream = await renderToReadableStream(
    <RemixServer context={remixContext} url={request.url} />
  );

  responseHeaders.set("Content-Type", "text/html");
  return new Response(stream, {
    headers: responseHeaders,
    status: responseStatusCode,
  });
}

const { now } = typeof performance !== "undefined" ? performance : Date;

async function handleBrowserRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext
) {
  const startTime = now();

  const stream = renderToReadableStream(
    <RemixServer context={remixContext} url={request.url} />
  );

  responseHeaders.set("Content-Type", "text/html; charset=utf-8");

  const readyTime = now() - startTime;
  responseHeaders.append(
    "Server-Timing",
    `render;desc="Render Page";dur=${readyTime}`
  );
  return new Response(stream, {
    headers: responseHeaders,
    status: responseStatusCode,
  });
}
