// https://typegraphql.com/docs/authorization.html#recipes

import { AuthChecker } from "type-graphql";

import { CONFIG } from "~/iso/config";
import { UserRole } from "~/iso/enums";
import { AuthError } from "~/iso/errors/customErrors";
import { Context } from "~/server/graphql/graphql-context";
import { logger } from "~/server/services/logger";

/**
 * Used with buildin typegraphql decorator @Authorized()
 */
export const customAuthChecker: AuthChecker<Context, UserRole> = async (
  { context },
  roles,
) => {
  if (CONFIG.GQL_DISABLE_AUTH_DECORATORS) {
    return true;
  }
  const { user } = context;

  if (!user?.role) {
    logger.warn("Unauthorized request to graphql");
    throw new AuthError("unauthorized-action");
  }

  logger.info(`authorizing ${user.role} => ${roles}`);
  return roles.includes(user.role);
};
