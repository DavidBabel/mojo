const defaultEnv = {
  NODE_ENV: process.env.NODE_ENV ?? "development",
  GRAPHQL_ENDPOINT: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT ?? "/api/graphql",
} as const;

export function ENV(key: keyof typeof defaultEnv) {
  return defaultEnv[key] ?? "";
}

export function isProd() {
  return process.env.NODE_ENV === "production";
}
