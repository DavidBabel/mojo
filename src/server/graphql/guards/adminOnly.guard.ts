import { MiddlewareFn } from "type-graphql";

import { UserRole } from "~/iso/enums";
import { Context } from "~/server/graphql/graphql-context";

export const adminOnlyGuard: MiddlewareFn<Context> = async ({ root }, next) => {
  if (root?.role !== UserRole.ADMIN) {
    throw new Error("Unauthorized");
  }
  return await next();
};
