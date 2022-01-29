import "reflect-metadata";
import { buildSchemaSync } from "type-graphql";

import {
  VideoUploadResolver,
  DummyQueryResolver,
} from "~/server/graphql/resolvers";
// import { ErrorInterceptorMiddleware } from "~/server/graphql/middlewares";

export const schema = buildSchemaSync({
  resolvers: [VideoUploadResolver, DummyQueryResolver],
  // globalMiddlewares: [ErrorInterceptorMiddleware],
  validate: false,
  emitSchemaFile: "src/server/graphql/generated/schema.gql",
});
