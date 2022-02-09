// eslint-disable-next-line no-restricted-imports -- only exception in the project
import { PrismaClient as PrismaClientBase } from "@prisma/client";

import { applyPrismaHooks } from "~/server/prisma/hooks/applyPrismaHooks";

export type PrismaClientType = typeof PrismaClient;

if (!(global as any).PrismaClient) {
  (global as any).PrismaClient = new PrismaClientBase();
  applyPrismaHooks((global as any).PrismaClient);
}

const PrismaClient: PrismaClientBase = (global as any).PrismaClient;

export { PrismaClient };
