import { MiddlewareFn } from "type-graphql";

import { emailPattern } from "~/iso/constant";

export const isEmailGuard: MiddlewareFn = async ({ args }, next) => {
  if (!args.email) {
    throw new Error("No email provided");
  }
  const email: string = args.email;
  if (!emailPattern.test(email)) {
    throw new Error("Wrong email format");
  }
  return await next();
};
