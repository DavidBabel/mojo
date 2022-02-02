import { PrismaClient as PrismaClientBase } from "@prisma/client";

const PrismaClient = {
  instance: new PrismaClientBase(),
};

Object.freeze(PrismaClient);

export { PrismaClient };
