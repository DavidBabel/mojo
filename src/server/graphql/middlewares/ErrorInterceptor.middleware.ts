import { MiddlewareFn } from "type-graphql";

export const ErrorInterceptorMiddleware: MiddlewareFn<any> = async (
  action,
  next,
) => {
  // console.log(action);
  try {
    return await next();
  } catch (err: any) {
    // handle logger here
    if (err?.message) {
      console.log(err.message);
    }
    // hide errors from db like printing sql query
    if (err?.message?.startsWith("File truncated as it exceeds")) {
      throw new Error("File too large");
    }

    // rethrow the error
    throw err;
  }
};
