import { GraphQLClient } from "graphql-request";
import { cache } from "react";
import { getSdk } from "../__generated__/gql";
import config from "./config";

export const client = new GraphQLClient(config.gqlURL);
export const sdk = getSdk(client);

for (const i of Object.keys(sdk) as (keyof typeof sdk)[]) {
  // @ts-expect-error hackery
  sdk[i] = cache(sdk[i]);
}
