import { MiddlewareFn } from "type-graphql";

import { UserRole } from "~/server/prisma/enums";

export const adminOnlyGuard: MiddlewareFn = async ({ root }, next) => {
  if (root?.role !== UserRole.ADMIN) {
    throw new Error("Unauthorized");
  }
  return await next();
};
