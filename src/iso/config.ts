// eslint-disable-next-line no-restricted-imports -- only exception in the project
import { ENV } from "~/iso/env";

export const CONFIG = {
  DEMO_VIDEO_ID: toString(ENV("DEMO_VIDEO_ID")),
  GITHUB_ID: toString(ENV("GITHUB_ID")),
  GITHUB_SECRET: toString(ENV("GITHUB_SECRET")),
  GQL_DISABLE_AUTH_DECORATORS: toBool(ENV("GQL_DISABLE_AUTH_DECORATORS")),
  GRAPHQL_ENDPOINT: toString(ENV("GRAPHQL_ENDPOINT")),
  HOSTNAME: stripProtocol(toString(ENV("HOSTNAME"))),
  MAX_FILE_SIZE_MB: toNumber(ENV("MAX_FILE_SIZE_MB")),
  NEXTAUTH_SECRET: toString(ENV("NEXTAUTH_SECRET")),
  NEXTAUTH_URL: toString(ENV("NEXTAUTH_URL")),
  NODE_ENV: toString<typeof process.env.NODE_ENV>(ENV("NODE_ENV")),
  NOTIFICATION_POSITION: "bottomRight",
  PASSWORD_SALT: "this is a salted mojo",
  PORT: toNumber(ENV("PORT")),
} as const;

function toBool(config: any) {
  return config === "1" || config === 1 || config === "true" || config === true;
}

function toNumber(config: any) {
  return Number(config) ?? 0;
}

function toString<RealType = string>(config: any) {
  return (String(config) ?? "") as unknown as RealType;
}

function stripProtocol(config: string) {
  return config.replace(/^https?:\/\//, "");
}
