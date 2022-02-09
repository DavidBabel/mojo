import { MiddlewareFn } from "type-graphql";

import { emailPattern } from "~/iso/constant";
import { AuthError } from "~/iso/errors/customErrors";
import { Context } from "~/server/graphql/graphql-context";

export const isEmailGuard: MiddlewareFn<Context> = async ({ args }, next) => {
  if (!args.email) {
    throw new AuthError("no-email-provided");
  }
  const email: string = args.email;
  if (!emailPattern.test(email)) {
    throw new AuthError("wrong-email-format");
  }
  return await next();
};
