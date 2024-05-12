import * as Sentry from "@sentry/remix";
import { PassThrough } from "stream";
import type { EntryContext } from "@remix-run/node";
import { Response } from "@remix-run/node";
import { RemixServer } from "@remix-run/react";
import { renderToPipeableStream } from "react-dom/server";
import styles from "./styles/app.css";
import NonceContext from "@/NonceContext";
import config from "./lib/api/config";
import { getDSN } from "./lib/api/config";

export function handleError(error: unknown, { request }: { request: Request }) {
  if (getDSN())
    Sentry.captureRemixServerException(error, "remix.server", request);
}

const dsn = getDSN();
if (dsn)
  Sentry.init({
    dsn: dsn,
    tracesSampleRate: 1,
  });

const ABORT_DELAY = 5000;

const now =
  typeof performance !== "undefined"
    ? () => performance.now()
    : () => Date.now();

export default function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext
) {
  return new Promise((resolve, reject) => {
    let didError = false;

    const nonce = Buffer.from(
      Math.random().toString().replace(/^0\./, "")
    ).toString("base64");

    const startTime = now();
    const { pipe, abort } = renderToPipeableStream(
      <NonceContext.Provider value={nonce}>
        <RemixServer context={remixContext} url={request.url} />
      </NonceContext.Provider>,
      {
        onShellReady() {
          const body = new PassThrough();

          responseHeaders.set("Content-Type", "text/html; charset=utf-8");
          responseHeaders.append("Link", `<${styles}>; rel=preload; as=style`);

          const readyTime = now() - startTime;
          responseHeaders.append(
            "Server-Timing",
            `render;desc="Render Page";dur=${readyTime}`
          );
          responseHeaders.append("X-Frame-Options", "SAMEORIGIN");
          responseHeaders.append("X-Content-Type-Options", "nosniff");
          responseHeaders.append("Referrer-policy", "same-origin");
          if (process.env.NODE_ENV == "production")
            responseHeaders.append(
              "Content-Security-Policy",
              `default-src 'self' https://gql.accsaber.com; img-src 'self' data: https:; style-src 'self' 'unsafe-inline'; script-src 'self' 'nonce-${nonce}'; object-src 'none'; base-uri 'self';`
            );
          responseHeaders.append("permissions-policy", "autoplay=(self)");
          responseHeaders.append(
            "strict-transport-security",
            "max-age=63072000; includeSubDomains; preload"
          );
          resolve(
            new Response(body, {
              headers: responseHeaders,
              status: didError ? 500 : responseStatusCode,
            })
          );

          pipe(body);
        },
        onShellError(err: unknown) {
          reject(err);
        },
        onError(error: unknown) {
          didError = true;

          console.error(error);
        },
      }
    );

    setTimeout(abort, ABORT_DELAY);
  });
}
