import type { ConfigFile } from "@rtk-query/codegen-openapi";

const config: ConfigFile = {
  schemaFile: "./config/search.yaml",
  apiFile: "./api/emptyApi.ts",
  apiImport: "emptySplitApi",
  outputFile: "./api/searchApi.ts",
  exportName: "searchApi",
  hooks: true,
};

export default config;
