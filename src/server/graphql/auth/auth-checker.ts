// https://typegraphql.com/docs/authorization.html#recipes

import { AuthChecker } from "type-graphql";

import { CONFIG } from "~/iso/config";
import { UserRole } from "~/iso/enums";
import { AuthError } from "~/iso/errors";
import { Context } from "~/server/graphql/graphql-context";

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
    console.warn("Unauthorized request to graphql");
    throw new AuthError("Unauthorized Action");
  }

  console.log("authorizing ", user.role, "=>", roles);
  return roles.includes(user.role);
};
