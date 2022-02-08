import { ContextFunction } from "apollo-server-core";
import { ExpressContext } from "apollo-server-express";
import { Session } from "next-auth";
import { getSession } from "next-auth/react";

import { PrismaClient } from "~/server/prisma/singleton";

export type Context = {
  prisma: typeof PrismaClient;
  user: Maybe<Session["user"]>;
};

/**
 * Can be used when we have a @LoggedIn() decorator to save some checks in code
 */
export type EnsuredUser<T extends Context> = T & {
  user: Session["user"];
};

export const context: ContextFunction<ExpressContext, object> = async ({
  req,
}): Promise<Context> => {
  const session = await getSession({ req });
  const user = session === null ? undefined : session.user;

  return { prisma: PrismaClient, user };
};
