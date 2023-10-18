import { readFileSync } from "fs";
export const typeDefs = readFileSync(require.resolve("./types.graphql")).toString("utf-8");
