import {
  type PrismaHook,
  applyHooks,
} from "~/server/prisma/hooks/helpers.hooks";
import { hashPassword } from "~/server/services/hash-password";

const hashPasswordHook: PrismaHook = async params => {
  if (params?.args?.data?.password?.set) {
    params.args.data.password.set = hashPassword(params.args.data.password.set);
  }
  return params;
};

export const userUpdateHooks: PrismaHook = async params =>
  await applyHooks(params, [hashPasswordHook]);
