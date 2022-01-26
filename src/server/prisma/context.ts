import { PrismaClient } from "@prisma/client";

export type Context = {
  prisma: PrismaClient;
  // req: Request;
  // res: Response;
};

const prisma = new PrismaClient();
export const context: Context = {
  prisma,
};
