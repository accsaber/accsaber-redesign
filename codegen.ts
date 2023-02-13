import { type CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "./schema.graphql",
  documents: ["./app/**/*.tsx", "./app/**/*.gql"],
  ignoreNoDocuments: true,
  generates: {
    "./app/__generated__/gql.ts": {
      plugins: ["typescript", "typescript-operations", "typed-document-node"],
    },
  },
};

export default config;
