// https://next-auth.js.org/

import NextAuth from "next-auth";

import { CONFIG } from "~/iso/config";
import { AuthProviders } from "~/iso/enums";
import { AuthError } from "~/iso/errors";
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
    maxAge: 60 * 60 * 24 * 30,
    secret: CONFIG.NEXTAUTH_SECRET,
  },
  pages: {
    // signOut: "/auth/signout",
    error: "/auth/error",
    newUser: "/",
    signIn: "/auth/signin",
  },
  providers: [githubProvider, credentialProvider],
  secret: CONFIG.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
});
