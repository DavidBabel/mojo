import { MiddlewareFn } from "type-graphql";

import { Context } from "~/server/graphql/graphql-context";

export const ErrorInterceptorMiddleware: MiddlewareFn<Context> = async (
  action,
  next,
) => {
  try {
    return await next();
  } catch (err: any) {
    // handle logger here
    if (err?.message) {
      console.log(err.message);
    }

    if (err?.message?.startsWith("File truncated as it exceeds")) {
      throw new Error("File too large");
    }

    throw err;
  }
};
