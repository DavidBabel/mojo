import "reflect-metadata";

import { applyResolversEnhanceMap, resolvers } from "@generated/type-graphql";
import { buildSchemaSync } from "type-graphql";

import { accessRightEnhancement } from "~/server/graphql/accessRight/applyDecorators";
import { customAuthChecker } from "~/server/graphql/auth/auth-checker";
import { ErrorInterceptorMiddleware } from "~/server/graphql/middlewares";
import {
  RegisterResolver,
  VideoUploadResolver,
} from "~/server/graphql/resolvers";

applyResolversEnhanceMap(accessRightEnhancement);

export const schema = buildSchemaSync({
  authChecker: customAuthChecker,
  emitSchemaFile: "src/server/graphql/generated/schema.gql",
  globalMiddlewares: [ErrorInterceptorMiddleware],
  resolvers: [...resolvers, RegisterResolver, VideoUploadResolver],
  validate: false,
});
