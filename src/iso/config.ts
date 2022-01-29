import { ENV } from "~/iso/env";

export const CONFIG = {
  PASSWORD_SALT: "this is a salted mojo",
  GRAPHQL_ENDPOINT: toString(ENV("GRAPHQL_ENDPOINT")),
  PORT: toNumber(ENV("PORT")),
} as const;

function toBool(config: any) {
  return config === "1" || config === 1 || config === "true" || config === true;
}

function toNumber(config: any) {
  return Number(config) ?? 0;
}

function toString(config: any) {
  return String(config) ?? "";
}