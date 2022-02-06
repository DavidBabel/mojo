// https://next-auth.js.org/

import NextAuth from "next-auth";

import { AuthProviders } from "~/iso/enums";
import { AuthError } from "~/iso/errors";
import { day } from "~/iso/numbers/time";
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
    redirect: ({ baseUrl }) => baseUrl,
    async session({ session, token }) {
      if (token.provider === AuthProviders.Github) {
        return githubSessionHandler({ session, token });
      } else if (token.provider === AuthProviders.Credentials) {
        return credentialSessionHandler({ session, token });
      }
      throw new AuthError(`Unknown provider ${token.provider}`);
    },
  },
  jwt: {
    maxAge: 10 * day,
  },
  pages: {
    error: "/auth/error",
    newUser: "/",
    signIn: "/auth/signin",
  },
  providers: [githubProvider, credentialProvider],
  session: {
    strategy: "jwt",
  },
});
