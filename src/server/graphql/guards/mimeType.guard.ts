import { FileUpload } from "graphql-upload";
import { MiddlewareFn } from "type-graphql";

const allowedMimeTypes = ["video/mp4"];

export const mimeTypeGuard: MiddlewareFn = async ({ args }, next) => {
  const { mimetype }: FileUpload = await args.video;
  if (!allowedMimeTypes.includes(mimetype)) {
    throw new Error("Invalid file type, only handle video/mp4");
  }
  return await next();
};
