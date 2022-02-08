import { createMethodDecorator, MiddlewareFn } from "type-graphql";

import { Context } from "~/server/graphql/graphql-context";

export const noOneGuard: MiddlewareFn<Context> = async () => {
  throw new Error("Disallowed action");
};

export function NoOneDecorator() {
  return createMethodDecorator<Context>(noOneGuard);
}
