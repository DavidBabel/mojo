// https://typegraphql.com/docs/authorization.html#recipes

import { AuthChecker } from "type-graphql";

import { Context } from "~/server/prisma/context";

export const customAuthChecker: AuthChecker<Context> = () =>
  // { context }, // { root, args, context, info },
  // roles,
  {
    console.log("TRIGGER customAuthChecker");

    // console.log(context.req.cookies);
    // console.log(context.req.signedCookies);
    // console.log("context");

    // console.log("roles");
    // console.log(roles);
    // here we can read the user from context  // and check his permission in the db against the `roles` argument
    // that comes from the `@Authorized` decorator, eg. ["ADMIN", "MODERATOR"]
    console.log("authorizing ...");
    return true; // or false if access is denied
  };
