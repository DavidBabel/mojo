import { Arg, Ctx, Mutation, Resolver, UseMiddleware } from "type-graphql";

import { isEmailGuard, passwordFormatGuard } from "~/server/graphql/guards";
import { Context } from "~/server/prisma/context";
import { UserRole } from "~/server/prisma/enums";
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
    const existingUser = await prisma.user.findFirst({ where: { email } });

    if (existingUser) {
      throw new Error("email already taken");
    }

    const hashedPassword = hashPassword(password.trim());

    const result = await prisma.user.create({
      data: {
        email: email.trim().toLocaleLowerCase(),
        name: name.trim(),
        password: hashedPassword,
        role: UserRole.USER,
      },
    });

    // await prisma.$disconnect();
    return "Created user!";
  }
}
