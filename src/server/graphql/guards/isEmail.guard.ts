import { MiddlewareFn } from "type-graphql";

import { emailPattern } from "~/iso/constant";
import { Context } from "~/server/graphql/graphql-context";

export const isEmailGuard: MiddlewareFn<Context> = async ({ args }, next) => {
  if (!args.email) {
    throw new Error("No email provided");
  }
  const email: string = args.email;
  if (!emailPattern.test(email)) {
    throw new Error("Wrong email format");
  }
  return await next();
};
