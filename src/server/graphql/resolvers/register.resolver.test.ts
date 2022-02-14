import "reflect-metadata";

import { User } from "@prisma/client";

import { UserRole } from "~/iso/enums";
import type { Context } from "~/server/graphql/graphql-context";
import { prismaMock } from "~/tools/test-utils/prisma-mock";

import { RegisterResolver } from "./register.resolver";

describe("Register Resolver", () => {
  let registerResolver: RegisterResolver;
  let context: Context;
  beforeEach(() => {
    registerResolver = new RegisterResolver();
    context = { prisma: prismaMock } as any as Context;
  });
  it("should throw if prisma is not able to query", async () => {
    prismaMock.user.findUnique.mockRejectedValue({});
    await expect(async () => {
      await registerResolver.registerNewUser(
        context,
        "email@email.com",
        "somepassword",
        "some name",
      );
    }).rejects.toThrowError("unable-to-search-for-user");
  });
  it("should throw if email is already taken", async () => {
    prismaMock.user.findUnique.mockResolvedValue({} as User);
    await expect(async () => {
      await registerResolver.registerNewUser(
        context,
        "email@email.com",
        "somepassword",
        "some name",
      );
    }).rejects.toThrowError("email-already-taken");
  });
  it("should throw if prisma is unable to register user", async () => {
    prismaMock.user.create.mockRejectedValue({});
    await expect(async () => {
      await registerResolver.registerNewUser(
        context,
        "email@email.com",
        "somepassword",
        "some name",
      );
    }).rejects.toThrowError("unable-to-register-user");
  });
  it("should return string when user was created", async () => {
    prismaMock.user.findUnique.mockResolvedValue(null);
    prismaMock.user.create.mockResolvedValue({} as User);
    const result = await registerResolver.registerNewUser(
      context,
      "email@email.com",
      "somepassword",
      "some name",
    );
    expect(prismaMock.user.create).toHaveBeenCalledTimes(1);
    expect(prismaMock.user.create).toHaveBeenCalledWith({
      data: {
        email: "email@email.com",
        name: "some name",
        password:
          "75cc38399502d7b55d5e11c86196df0f82fd05c2ab7e631845126a35993acd00",
        role: UserRole.USER,
      },
    });
    expect(result).toBe("Created user!");
  });
});
