import { FileUpload } from "graphql-upload";
import { MiddlewareFn } from "type-graphql";

import { Context } from "~/server/graphql/graphql-context";

const allowedMimeTypes = ["video/mp4"];

export const mimeTypeGuard: MiddlewareFn<Context> = async ({ args }, next) => {
  const { mimetype }: FileUpload = await args.video;
  if (!allowedMimeTypes.includes(mimetype)) {
    throw new Error("Invalid file type, only handle video/mp4");
  }
  return await next();
};
