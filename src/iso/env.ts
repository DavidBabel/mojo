const defaultEnv = {
  NODE_ENV: process.env.NODE_ENV ?? "development",
  GRAPHQL_ENDPOINT: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT ?? "/graphql",
  NEXTAUTH_URL: process.env.NEXTAUTH_URL ?? "",
  NEXT_AUTH_SECRET: process.env.NEXT_AUTH_SECRET ?? "",
  MAX_FILE_SIZE_MB: process.env.MAX_FILE_SIZE_MB ?? 5,
  PORT: process.env.PORT ?? 3000,
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
