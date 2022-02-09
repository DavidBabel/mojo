import { MiddlewareFn } from "type-graphql";

import { VideoUploadError } from "~/iso/errors/customErrors";
import { Context } from "~/server/graphql/graphql-context";

export const ErrorInterceptorMiddleware: MiddlewareFn<Context> = async (
  action,
  next,
) => {
  try {
    return await next();
  } catch (err: any) {
    // handle logger here
    if (err?.message) {
      console.log(err.message);
    }

    if (err?.message?.startsWith("File truncated as it exceeds")) {
      throw new VideoUploadError("file-too-large");
    }

    throw err;
  }
};
