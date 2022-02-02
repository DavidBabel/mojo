import { MiddlewareFn } from "type-graphql";

const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

export const isEmailGuard: MiddlewareFn = async ({ args }, next) => {
  if (!args.email) {
    throw new Error("No email provided");
  }
  const email: string = args.email;
  if (!emailRegex.test(email)) {
    throw new Error("Wrong email format");
  }
  return await next();
};
