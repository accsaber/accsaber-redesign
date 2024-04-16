import request, { GraphQLClient } from "graphql-request";
import config from "./config";
import type { TypedDocumentNode } from "@graphql-typed-document-node/core";
import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import { persistedFetch } from "./persistedFetch";

export const gqlClient = new GraphQLClient(config.gqlURL, {
  fetch,
});

export function useGql<TResult, TVariables>(
  document: TypedDocumentNode<TResult, TVariables>,
  ...[variables]: TVariables extends Record<string, never> ? [] : [TVariables]
): UseQueryResult<TResult> {
  return useQuery(
    [(document.definitions[0] as any).name.value, variables],
    async ({ queryKey }) =>
      gqlClient.request(document, queryKey[1] ? queryKey[1] : undefined)
  );
}
