import type { Prisma } from "@prisma/client";

type Model = Prisma.ModelName;
type Action = Prisma.PrismaAction;
type Middleware = Prisma.Middleware;
type Params = Prisma.MiddlewareParams;
export type PrismaHook = (values: Params) => Promise<Params>;

export function on(model: Model, event: Action, hook: PrismaHook) {
  const middleware: Middleware = async (params, next) => {
    if (params.model === model && params.action === event) {
      return next(await hook(params));
    }
    return next(params);
  };
  return middleware;
}

export const applyHooks = async (params: Params, hooks: PrismaHook[]) => {
  for (const middleware of hooks) {
    params = await middleware(params);
  }
  return params;
};
