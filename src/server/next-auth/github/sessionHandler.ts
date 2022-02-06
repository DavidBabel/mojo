import { SessionHandler } from "~/@types/next-auth";
import { AuthProviders, UserRole } from "~/iso/enums";
import { AuthError } from "~/iso/errors";
import { PrismaClient } from "~/server/prisma/singleton";

export const githubSessionHandler: SessionHandler = async ({
  session,
  token,
}) => {
  try {
    let user = await PrismaClient.user.findUnique({
      where: { oAuthId: token.providerId },
    });

    if (!user) {
      console.log("user not found, creating");
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
  } catch (error) {
    console.error(error);
    throw new AuthError("Authentication failed");
  }
};
