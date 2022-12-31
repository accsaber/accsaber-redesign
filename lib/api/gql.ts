import { GraphQLClient } from "graphql-request";
import { getSdk } from "../__generated__/gql";
import config from "./config";

export const client = new GraphQLClient(config.gqlURL);
export const sdk = getSdk(client);
