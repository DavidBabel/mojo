import { MiddlewareFn } from "type-graphql";

import { VideoUploadError } from "~/iso/errors/customErrors";
import { Context } from "~/server/graphql/graphql-context";
import { logger } from "~/server/services/logger";

export const ErrorInterceptorMiddleware: MiddlewareFn<Context> = async (
  action,
  next,
) => {
  try {
    return await next();
  } catch (err: any) {
    if (err?.message) {
      logger.error(err.message, err);
    }

    if (err?.message?.startsWith("File truncated as it exceeds")) {
      throw new VideoUploadError("file-too-large");
    }

    throw err;
  }
};
