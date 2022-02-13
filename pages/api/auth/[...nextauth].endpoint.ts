// https://next-auth.js.org/

import NextAuth from "next-auth";

import { AuthProviders } from "~/iso/enums";
import { min } from "~/iso/numbers/time";
import { AuthError } from "~/server/errors";
import {
  credentialProvider,
  credentialSessionHandler,
} from "~/server/next-auth/credentials";
import {
  githubProvider,
  githubSessionHandler,
} from "~/server/next-auth/github";

export default NextAuth({
  callbacks: {
    jwt: ({ token, account }) => {
      if (account) {
        token.provider = account.provider;
        token.providerId = account.providerAccountId;
      }
      return token;
    },
    redirect: ({ baseUrl }) => `${baseUrl}/auth/success`,
    async session({ session, token }) {
      if (token.provider === AuthProviders.Github) {
        return githubSessionHandler({ session, token });
      } else if (token.provider === AuthProviders.Credentials) {
        return credentialSessionHandler({ session, token });
      }
      throw new AuthError("unknown-provider");
    },
  },
  jwt: {
    maxAge: 45 * min,
  },
  pages: {
    error: "/auth/error",
    newUser: "/auth/register-success",
    signIn: "/auth/signin",
  },
  providers: [githubProvider, credentialProvider],
  session: {
    strategy: "jwt",
  },
});
