import { PrismaClient } from "~/server/prisma/singleton";

export async function cleanUpDBUser(email: string) {
  try {
    await PrismaClient.video.deleteMany({
      where: {
        author: {
          email,
        },
      },
    });
  } catch (_) {}
  try {
    await PrismaClient.user.delete({
      where: {
        email,
      },
    });
  } catch (_) {}
}
