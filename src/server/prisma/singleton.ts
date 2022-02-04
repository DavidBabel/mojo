import { PrismaClient as PrismaClientBase } from "@prisma/client";

if (!(global as any).PrismaClient) {
  (global as any).PrismaClient = new PrismaClientBase();
}

const PrismaClient: PrismaClientBase = (global as any).PrismaClient;

export { PrismaClient };
