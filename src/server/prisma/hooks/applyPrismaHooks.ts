import { on } from "~/server/prisma/hooks/helpers.hooks";
import { userUpdateHooks } from "~/server/prisma/hooks/User/userUpdateHook";
import { PrismaClientType } from "~/server/prisma/singleton";

export function applyPrismaHooks(prismaClient: PrismaClientType) {
  prismaClient.$use(on("User", "update", userUpdateHooks));
}
