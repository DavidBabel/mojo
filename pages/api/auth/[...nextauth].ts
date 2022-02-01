// https://next-auth.js.org/getting-started/example
// https://www.youtube.com/watch?v=kB6YNYZ63fw

// import { JWT } from "next-auth/jwt";
// https://next-auth.js.org/adapters/prisma
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";

import { UserRole } from "~/server/prisma/enums";
import { checkPassword } from "~/server/services/password/hash-password.service";

const prisma = new PrismaClient();

// NOTE: this code is very in progress

export default NextAuth({
  secret: process.env.NEXT_AUTH_SECRET,
  adapter: PrismaAdapter(prisma),
  jwt: {
    secret: "any", // TODO: put a more complexe code
    maxAge: 60 * 60 * 24 * 30,
  },
  pages: {
    signIn: "/auth/signin",
    // newUser: "/", // New users will be directed here on first sign in (leave the property out if not of interest)
    // signOut: "/auth/signout",
    // error: "/auth/error", // Error code passed in query string as ?error=
    // verifyRequest: "/auth/verify-request", // (used for check email message)
  },
  callbacks: {
    async session({ session, token, user }) {
      // Send properties to the client, like an access_token from a provider.
      // session.accessToken = token.accessToken;
      session.user.role = String(user.role) as UserRole;
      session.user.image = String(user.image);
      session.user.name = String(user.name);
      session.user.id = String(user.id);
      return session;
    },
  },
  // callbacks: {
  //   async signIn(signInInfos) {
  //     console.log("signInInfos", signInInfos);

  //     const isAllowedToSignIn = true;
  //     if (isAllowedToSignIn) {
  //       return true;
  //     } else {
  //       // Return false to display a default error message
  //       return false;
  //       // Or you can return a URL to redirect to:
  //       // return '/unauthorized'
  //     }
  //   },
  // },
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    CredentialsProvider({
      credentials: {
        email: { label: "Email", type: "text", placeholder: "mail@mail.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { email, password } = credentials!;
        if (!email || !password) {
          throw new Error("Credentials not found");
        }
        const prisma = new PrismaClient();

        const user = await prisma.user.findFirst({
          where: { email },
        });

        if (!user) {
          throw new Error("No user found!");
        }

        const isValid = checkPassword(password, user.password!);

        if (!isValid) {
          throw new Error("Could not log you in!");
        }

        return { email: user.email };
      },
    }),
    // GoogleProvider({
    //   clientId: process.env.GOOGLE_ID!,
    //   clientSecret: process.env.GOOGLE_SECRET!,
    // }),
    // CredentialsProvider({
    //   // The name to display on the sign in form (e.g. 'Sign in with...')
    //   name: "Credentials",
    //   // The credentials is used to generate a suitable form on the sign in page.
    //   // You can specify whatever fields you are expecting to be submitted.
    //   // e.g. domain, username, password, 2FA token, etc.
    //   // You can pass any HTML attribute to the <input> tag through the object.
    //   credentials: {
    //     username: { label: "Username", type: "text", placeholder: "jsmith" },
    //     password: { label: "Password", type: "password" },
    //   },
    //   async authorize(credentials, req) {
    //     // You need to provide your own logic here that takes the credentials
    //     // submitted and returns either a object representing a user or value
    //     // that is false/null if the credentials are invalid.
    //     // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
    //     // You can also use the `req` object to obtain additional parameters
    //     // (i.e., the request IP address)
    //     const res = await fetch("/your/endpoint", {
    //       method: "POST",
    //       body: JSON.stringify(credentials),
    //       headers: { "Content-Type": "application/json" },
    //     });
    //     const user = await res.json();

    //     // If no error and we have user data, return it
    //     if (res.ok && user) {
    //       return user;
    //     }
    //     // Return null if user data could not be retrieved
    //     return null;
    //   },
    // }),
  ],
});
