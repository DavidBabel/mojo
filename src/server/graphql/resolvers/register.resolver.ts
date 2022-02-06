import { User } from "@prisma/client";
import { Arg, Ctx, Mutation, Resolver, UseMiddleware } from "type-graphql";

import { UserRole } from "~/iso/enums";
import { Context } from "~/server/graphql/graphql-context";
import { isEmailGuard, passwordFormatGuard } from "~/server/graphql/guards";
import { hashPassword } from "~/server/services/password/hash-password.service";

@Resolver()
export class RegisterResolver {
  @Mutation(() => String)
  @UseMiddleware(isEmailGuard, passwordFormatGuard)
  async registerNewUser(
    @Ctx() { prisma }: Context,
    @Arg("email", () => String) email: string,
    @Arg("password", () => String) password: string,
    @Arg("name", () => String) name: string,
  ) {
    let existingUser: MaybeNull<User> = null;
    try {
      existingUser = await prisma.user.findUnique({ where: { email } });
    } catch (error) {
      throw new Error("unable to search for user");
    }

    if (existingUser) {
      throw new Error("email already taken");
    }

    const hashedPassword = hashPassword(password.trim());

    try {
      await prisma.user.create({
        data: {
          email: email.trim().toLocaleLowerCase(),
          name: name.trim(),
          password: hashedPassword,
          role: UserRole.USER,
        },
      });
    } catch (error) {
      console.error(error);
      throw new Error("unable to register user");
    }

    // await prisma.$disconnect();
    return "Created user!";
  }
}
