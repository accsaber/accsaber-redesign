import { type CodegenConfig } from "@graphql-codegen/cli";
import appConfig from "./app/lib/api/config";

const config: CodegenConfig = {
  schema: appConfig.gqlURL,
  documents: ["./app/**/*.tsx", "./app/**/*.gql"],
  ignoreNoDocuments: true,
  generates: {
    "./app/__generated__/gql.ts": {
      plugins: ["typescript", "typescript-operations", "typed-document-node"],
    },
  },
};

export default config;
