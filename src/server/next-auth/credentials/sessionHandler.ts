import { SessionHandler } from "~/@types/next-auth";
import { AuthProviders, UserRole } from "~/iso/enums";
import { AuthError } from "~/iso/errors/customErrors";
import { PrismaClient } from "~/server/prisma/singleton";
import { logger } from "~/server/services/logger";

export const credentialSessionHandler: SessionHandler = async ({
  session,
  token,
}) => {
  try {
    const user = await PrismaClient.user.findUnique({
      where: { id: token.providerId },
    });

    if (user) {
      session.user.role = user.role as UserRole;
      session.user.id = user.id;
      session.user.email = user.email;
      session.provider = AuthProviders.Credentials;
    }

    return session;
  } catch (error: any) {
    logger.error(error?.message, error);
    throw new AuthError("authentication-failed");
  }
};
