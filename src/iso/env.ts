/* eslint-disable node/no-process-env -- only exception in the project */
const isoEnv = {
  GRAPHQL_ENDPOINT: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT ?? "/graphql",
  MAX_FILE_SIZE_MB: process.env.NEXT_PUBLIC_MAX_FILE_SIZE_MB ?? 5,
};

const defaultEnv = {
  GITHUB_ID: process.env.GITHUB_ID ?? "",
  GITHUB_SECRET: process.env.GITHUB_SECRET ?? "",
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
