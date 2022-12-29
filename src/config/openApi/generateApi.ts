import type { ConfigFile } from "@rtk-query/codegen-openapi";

const config: ConfigFile = {
  schemaFile: "./config/search.yaml",
  apiFile: "./emptyApi.ts",
  outputFile: "./api/searchApi.ts",
  exportName: "searchApi",
  hooks: true,
};

export default config;
