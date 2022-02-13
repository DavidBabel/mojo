import { MiddlewareFn } from "type-graphql";

import { UnknownError, VideoUploadError } from "~/server/errors";
import { Context } from "~/server/graphql/graphql-context";

export const ErrorInterceptorMiddleware: MiddlewareFn<Context> = async (
  action,
  next,
) => {
  try {
    return await next();
  } catch (err: any) {
    if (err?.message?.startsWith("File truncated as it exceeds")) {
      throw new VideoUploadError("file-too-large");
    }

    throw new UnknownError(err);
  }
};
