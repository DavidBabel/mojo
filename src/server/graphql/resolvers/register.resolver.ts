import { User } from "@prisma/client";
import {
  Arg,
  Ctx,
  Mutation,
  Resolver,
  UseMiddleware as UseGuards,
} from "type-graphql";

import { UserRole } from "~/iso/enums";
import { OrmError, RegisterError } from "~/iso/errors/customErrors";
import { Context } from "~/server/graphql/graphql-context";
import { isEmailGuard, passwordFormatGuard } from "~/server/graphql/guards";
import { hashPassword } from "~/server/services/hash-password";

@Resolver()
export class RegisterResolver {
  @Mutation(() => String)
  @UseGuards(isEmailGuard, passwordFormatGuard)
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
      throw new OrmError("unable-to-search-for-user");
    }

    if (existingUser) {
      throw new RegisterError("email-already-taken");
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
      throw new OrmError("unable-to-register-user");
    }

    return "Created user!";
  }
}
