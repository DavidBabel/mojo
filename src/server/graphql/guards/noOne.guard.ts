import { createMethodDecorator, MiddlewareFn } from "type-graphql";

import { RightsError } from "~/iso/errors/customErrors";
import { Context } from "~/server/graphql/graphql-context";

export const noOneGuard: MiddlewareFn<Context> = async () => {
  throw new RightsError("disallowed-action");
};

export function NoOneDecorator() {
  return createMethodDecorator<Context>(noOneGuard);
}
