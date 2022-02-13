// note: you cannot import anything here
/* eslint-disable node/no-process-env -- only exception in the project */
const isoEnv = {
  DEMO_VIDEO_ID: process.env.NEXT_PUBLIC_DEMO_VIDEO_ID ?? "demo-video",
  GRAPHQL_ENDPOINT: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT ?? "/graphql",
  MAX_FILE_SIZE_MB: process.env.NEXT_PUBLIC_MAX_FILE_SIZE_MB ?? 15,
};

const defaultEnv = {
  DD_API_KEY: process.env.DD_API_KEY ?? "",
  DD_SERVICE: process.env.DD_SERVICE ?? "mojo-local",
  FORCE_DATADOG_IN_DEV: process.env.FORCE_DATADOG_IN_DEV ?? false,
  GITHUB_ID: process.env.GITHUB_ID ?? "",
  GITHUB_SECRET: process.env.GITHUB_SECRET ?? "",
  GQL_DISABLE_AUTH_DECORATORS: process.env.GQL_DISABLE_AUTH_DECORATORS ?? false,
  HOSTNAME: process.env.NEXTAUTH_URL ?? "",
  LOG_LEVEL: process.env.LOG_LEVEL ?? "info",
  NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET ?? "",
  NEXTAUTH_URL: process.env.NEXTAUTH_URL ?? "",
  NODE_ENV: process.env.NODE_ENV ?? "development",
  PORT: process.env.PORT ?? 3000,
  ...isoEnv,
} as const;

export function ENV(key: keyof typeof defaultEnv) {
  return defaultEnv[key] ?? "";
}

export function isProd() {
  return ENV("NODE_ENV") === "production";
}

export function isDev() {
  return !isProd();
}
