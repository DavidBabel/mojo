import { ContextFunction } from "apollo-server-core";
import { ExpressContext } from "apollo-server-express";

import { PrismaClient } from "~/server/prisma/singleton";

export type Context = {
  prisma: typeof PrismaClient;
  req: ExpressContext["req"];
  // res: Response;
};

export const context: ContextFunction<ExpressContext, object> = ({
  req,
}): Context => {
  return { prisma: PrismaClient, req };
};
