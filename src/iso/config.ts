// note: you cannot import anything here
// eslint-disable-next-line -- only exception in the project
import { ENV } from "~/iso/env";

export const CONFIG = {
  DD_API_KEY: toString(ENV("DD_API_KEY")),
  DD_SERVICE: toString(ENV("DD_SERVICE")),
  DEMO_VIDEO_ID: toString(ENV("DEMO_VIDEO_ID")),
  FORCE_DATADOG_IN_DEV: toBool(ENV("FORCE_DATADOG_IN_DEV")),
  GITHUB_ID: toString(ENV("GITHUB_ID")),
  GITHUB_SECRET: toString(ENV("GITHUB_SECRET")),
  GQL_DISABLE_AUTH_DECORATORS: toBool(ENV("GQL_DISABLE_AUTH_DECORATORS")),
  GRAPHQL_ENDPOINT: toString(ENV("GRAPHQL_ENDPOINT")),
  HOSTNAME: toString(ENV("HOSTNAME")),
  LOG_LEVEL: toString<LogLevel>(ENV("LOG_LEVEL")),
  MAX_FILE_SIZE_MB: toNumber(ENV("MAX_FILE_SIZE_MB")),
  NEXTAUTH_SECRET: toString(ENV("NEXTAUTH_SECRET")),
  NEXTAUTH_URL: toString(ENV("NEXTAUTH_URL")),
  NODE_ENV: toString<NodeEnvType>(ENV("NODE_ENV")),
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
