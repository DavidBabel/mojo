import { MiddlewareFn } from "type-graphql";

import { passwordMaxLength, passwordMinLength } from "~/iso/constant";

export const passwordFormatGuard: MiddlewareFn = async ({ args }, next) => {
  if (!args.password) {
    throw new Error("No password provided");
  }
  const { password } = args;
  if (
    password.length < passwordMinLength ||
    password.length > passwordMaxLength
  ) {
    throw new Error("Password should be between 8 and 32 characters");
  }
  return await next();
};
