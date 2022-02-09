import CredentialsProvider from "next-auth/providers/credentials";

import { AuthProviders } from "~/iso/enums";
import { AuthError } from "~/iso/errors/customErrors";
import { PrismaClient } from "~/server/prisma/singleton";
import { checkPassword } from "~/server/services/hash-password";

export const credentialProvider = CredentialsProvider({
  async authorize(credentials) {
    const { email, password } = credentials!;
    if (!email || !password) {
      throw new AuthError("credentials-not-found");
    }

    const user = await PrismaClient.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new AuthError("no-user-found");
    }

    const isValid = checkPassword(password, user.password!);

    if (!isValid) {
      throw new AuthError("could-not-log-you-in");
    }

    return user;
  },
  credentials: {
    email: { label: "Email", placeholder: "mail@mail.com", type: "text" },
    password: { label: "Password", type: "password" },
  },
  id: AuthProviders.Credentials,
});
