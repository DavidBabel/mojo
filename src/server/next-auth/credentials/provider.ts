import CredentialsProvider from "next-auth/providers/credentials";

import { AuthProviders } from "~/iso/enums";
import { AuthError } from "~/iso/errors";
import { PrismaClient } from "~/server/prisma/singleton";
import { checkPassword } from "~/server/services/password/hash-password.service";

export const credentialProvider = CredentialsProvider({
  async authorize(credentials) {
    const { email, password } = credentials!;
    if (!email || !password) {
      throw new AuthError("Credentials not found");
    }

    const user = await PrismaClient.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new AuthError("No user found!");
    }

    const isValid = checkPassword(password, user.password!);

    if (!isValid) {
      throw new AuthError("Could not log you in!");
    }

    return user;
  },
  credentials: {
    email: { label: "Email", placeholder: "mail@mail.com", type: "text" },
    password: { label: "Password", type: "password" },
  },
  id: AuthProviders.Credentials,
});
