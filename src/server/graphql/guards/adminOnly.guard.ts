import { MiddlewareFn } from "type-graphql";

import { UserRole } from "~/iso/enums";
import { RightsError } from "~/iso/errors/customErrors";
import { Context } from "~/server/graphql/graphql-context";

export const adminOnlyGuard: MiddlewareFn<Context> = async ({ root }, next) => {
  if (root?.role !== UserRole.ADMIN) {
    throw new RightsError("unauthorized");
  }
  return await next();
};
