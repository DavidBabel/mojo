import { SessionHandler } from "~/@types/next-auth";
import { AuthProviders, UserRole } from "~/iso/enums";
import { AuthError } from "~/server/errors";
import { PrismaClient } from "~/server/prisma/singleton";
import { logger } from "~/server/services/logger";

export const githubSessionHandler: SessionHandler = async ({
  session,
  token,
}) => {
  try {
    let user = await PrismaClient.user.findUnique({
      where: { oAuthId: token.providerId },
    });

    if (!user) {
      logger.info("user not found, creating");
      user = await PrismaClient.user.create({
        data: {
          image: token.picture,
          name: token.name,
          oAuthId: token.providerId,
        },
      });
    }

    session.user.role = user.role as UserRole;
    session.user.id = user.id;
    session.provider = AuthProviders.Github;

    return session;
  } catch (error: any) {
    logger.error(error?.message, error);
    throw new AuthError("authentication-failed");
  }
};
