import { CONFIG } from "~/iso/config";

const credentialsConf = {
  credentials: true,
  origin: (
    origin: string,
    callback: (error: MaybeNull<Error>, origin: string) => void,
  ) => callback(null, origin),
};

interface CorsConf {
  apolloClientCredentials: "include" | "same-origin";
  apolloServerCors: { cors: typeof credentialsConf } | {};
  expressServerCors: typeof credentialsConf | {};
}

const cors: Record<typeof process.env.NODE_ENV, CorsConf> = {
  development: {
    apolloClientCredentials: "include",
    apolloServerCors: {
      cors: credentialsConf,
    },
    expressServerCors: credentialsConf,
  },
  production: {
    apolloClientCredentials: "same-origin",
    apolloServerCors: {},
    expressServerCors: {},
  },
  test: {
    apolloClientCredentials: "same-origin",
    apolloServerCors: {},
    expressServerCors: {},
  },
};

export function getCors(confKey: keyof typeof cors["development"]): any {
  return cors[CONFIG.NODE_ENV][confKey];
}
