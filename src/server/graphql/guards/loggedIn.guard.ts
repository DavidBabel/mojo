import { createMethodDecorator, MiddlewareFn } from "type-graphql";

import { Context } from "~/server/graphql/graphql-context";
import { noUser } from "~/server/graphql/guards/helpers/guard.helpers";

export const loggedInGuard: MiddlewareFn<Context> = async (
  { context },
  next,
) => {
  const { user } = context;
  if (noUser(user)) {
    throw new Error("You need to be logged in to perform this action");
  }

  return await next();
};

export function LoggedInDecorator() {
  return createMethodDecorator<Context>(loggedInGuard);
}
