import "reflect-metadata";

import { ResolverData } from "type-graphql";

import type { Context } from "~/server/graphql/graphql-context";

import { isEmailGuard } from "./isEmail.guard";

describe("Register Resolver", () => {
  function getEmailArgs(email?: string) {
    return {
      args: {
        email,
      },
    } as any as ResolverData<Context>;
  }

  const nextFn = jest.fn();

  beforeEach(() => {
    nextFn.mockReset();
  });

  it("should throw if no email was provided", async () => {
    await expect(async () => {
      await isEmailGuard(getEmailArgs(undefined), nextFn);
    }).rejects.toThrowError("no-email-provided");
  });
  it("should throw if email has a wrong format", async () => {
    await expect(async () => {
      await isEmailGuard(getEmailArgs("wrong.email.com"), nextFn);
    }).rejects.toThrowError("wrong-email-format");
  });
  it("should call nextFn if the email is valid", async () => {
    await isEmailGuard(getEmailArgs("good@email.com"), nextFn);
    expect(nextFn).toHaveBeenCalledTimes(1);
  });
});
