import "reflect-metadata";

import { applyResolversEnhanceMap, resolvers } from "@generated/type-graphql";
import { buildSchemaSync } from "type-graphql";

import { CONFIG } from "~/iso/config";
import { accessRightEnhancement } from "~/server/graphql/accessRight/applyDecorators";
import { customAuthChecker } from "~/server/graphql/auth/auth-checker";
import { ErrorInterceptorMiddleware } from "~/server/graphql/middlewares";
import {
  RegisterResolver,
  VideoCreateResolver,
} from "~/server/graphql/resolvers";

if (!CONFIG.GQL_DISABLE_AUTH_DECORATORS) {
  applyResolversEnhanceMap(accessRightEnhancement);
}

export const schema = buildSchemaSync({
  authChecker: customAuthChecker,
  emitSchemaFile: "src/server/graphql/generated/schema.gql",
  globalMiddlewares: [ErrorInterceptorMiddleware],
  resolvers: [...resolvers, RegisterResolver, VideoCreateResolver],
  validate: false,
});
