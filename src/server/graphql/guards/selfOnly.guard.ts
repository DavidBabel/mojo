import { MiddlewareFn } from "type-graphql";

export const selfOnlyGuard: MiddlewareFn = async ({ root }, next) => {
  // TODO: retreive self
  if (root?.id !== "self") {
    throw new Error("Unauthorized");
  }
  return await next();
};
