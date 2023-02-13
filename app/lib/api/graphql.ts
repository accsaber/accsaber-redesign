import { BatchHttpLink } from "@apollo/client/link/batch-http";

export const httpLink = new BatchHttpLink({
	uri: "https://main--accsaber-supergraph.apollographos.net/graphql",
});
