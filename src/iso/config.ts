import { ENV } from "~/iso/env";

export const CONFIG = {
  PASSWORD_SALT: "this is a salted mojo",
  GRAPHQL_ENDPOINT: toString(ENV("GRAPHQL_ENDPOINT")),
} as const;

function toBool(config: any) {
  return config === "1" || config === 1 || config === "true" || config === true;
}

function toString(config: any) {
  return String(config);
}
