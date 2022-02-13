import { MiddlewareFn } from "type-graphql";

import { passwordMaxLength, passwordMinLength } from "~/iso/constant";
import { AuthError } from "~/server/errors";
import { Context } from "~/server/graphql/graphql-context";

export const passwordFormatGuard: MiddlewareFn<Context> = async (
  { args },
  next,
) => {
  if (!args.password) {
    throw new AuthError("no-password-provided");
  }
  const { password } = args;
  if (
    password.length < passwordMinLength ||
    password.length > passwordMaxLength
  ) {
    throw new AuthError("wrong-password-size");
  }
  return await next();
};
