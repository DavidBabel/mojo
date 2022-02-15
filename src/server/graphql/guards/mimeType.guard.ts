import { FileUpload } from "graphql-upload";
import { MiddlewareFn } from "type-graphql";

import { allowedMimeTypes } from "~/iso/constant";
import { VideoUploadError } from "~/server/errors";
import { Context } from "~/server/graphql/graphql-context";

export const videoMimeTypeGuard: MiddlewareFn<Context> = async (
  { args },
  next,
) => {
  const { mimetype }: FileUpload = await args.video;
  if (!allowedMimeTypes.includes(mimetype)) {
    throw new VideoUploadError("invalid-file-type");
  }
  return await next();
};
