import { type CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "./schema.graphql",
  documents: ["./app/**/*.tsx", "./app/**/*.gql"],
  ignoreNoDocuments: true, // for better experience with the watcher
  generates: {
    "./app/__generated__/gql/": {
      preset: "client",
      plugins: ["typescript-graphql-request"],
    },
  },
};

export default config;
