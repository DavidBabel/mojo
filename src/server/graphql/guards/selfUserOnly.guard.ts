import { createMethodDecorator, MiddlewareFn } from "type-graphql";

import { Context } from "~/server/graphql/graphql-context";
import {
  adminByPass,
  isCurrentRequestedUser,
} from "~/server/graphql/guards/helpers/guard.helpers";

export const selfUserOnlyGuard: MiddlewareFn<Context> = async (
  { context, args },
  next,
) => {
  const { user } = context;

  if (adminByPass(user)) {
    return await next();
  }

  if (isCurrentRequestedUser(user, args)) {
    throw new Error("A user can only edit itself");
  }

  return await next();
};

export function SelfUserOnlyDecorator() {
  return createMethodDecorator<Context>(selfUserOnlyGuard);
}