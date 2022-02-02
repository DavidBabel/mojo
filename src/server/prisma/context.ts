import { PrismaClient } from "~/server/prisma/singleton";

export type Context = {
  prisma: typeof PrismaClient.instance;
  // req: Request;
  // res: Response;
};

const prisma = PrismaClient.instance;
export const context: Context = {
  prisma,
};
