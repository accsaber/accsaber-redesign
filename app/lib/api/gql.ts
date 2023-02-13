import { GraphQLClient } from "graphql-request";
import config from "./config";
import type { TypedDocumentNode } from "@graphql-typed-document-node/core";
import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import { getSdk } from "$gql";

export const gqlClient = new GraphQLClient(config.gqlURL);

export function useGql<TResult, TVariables>(
  document: TypedDocumentNode<TResult, TVariables>,
  ...[variables]: TVariables extends Record<string, never> ? [] : [TVariables]
): UseQueryResult<TResult> {
  return useQuery(
    [(document.definitions[0] as any).name.value, variables],
    async ({ queryKey }) =>
      gqlClient.request(
        config.gqlURL,
        document,
        queryKey[1] ? queryKey[1] : undefined
      )
  );
}
export const sdk = getSdk(gqlClient);
