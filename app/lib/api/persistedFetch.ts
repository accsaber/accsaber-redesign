import { GraphQLList, parse } from "graphql";
import {
  GraphQLRequestContext,
  GraphQLResponse,
} from "graphql-request/dist/types";

const { subtle } = globalThis.crypto ?? require("crypto").webcrypto;
export const persistedFetch: typeof fetch = async (input, init) => {
  if (!init?.body) return new Response("Missing request body", { status: 400 });
  const queryInfo = JSON.parse(init.body.toString()) as GraphQLRequestContext;

  const rawBody: ArrayBuffer = new TextEncoder().encode(
    queryInfo.query.toString()
  );
  if (!rawBody) return new Response("Missing request body", { status: 400 });

  const hashedBuffer = await subtle.digest("SHA-256", rawBody);
  const hashString = [...new Uint8Array(hashedBuffer)]
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");

  const bodyWithPersistedQuery = {
    ...queryInfo,
    extensions: {
      persistedQuery: {
        version: 1,
        sha256Hash: hashString,
      },
    },
  };

  const persistedRequest = new Request(input, {
    ...init,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ...bodyWithPersistedQuery, query: undefined }),
  });

  const res = await fetch(persistedRequest);
  if (res.status !== 200) return res;
  const parsedBody = (await res.clone().json()) as GraphQLResponse; // TODO: Response schema validation
  if (parsedBody.errors?.length) {
    for (const error of parsedBody.errors) {
      if (error.extensions.code === "PERSISTED_QUERY_NOT_FOUND")
        return await fetch(input, {
          ...init,
          body: JSON.stringify(bodyWithPersistedQuery),
        });
    }
  }

  return res;
};
