import {
  Arg,
  MiddlewareFn,
  Mutation,
  Resolver,
  UseMiddleware,
} from "type-graphql";
import { GraphQLUpload, FileUpload } from "graphql-upload";
import { saveToLocal, saveToBucket } from "~/server/services/imageUpload";
import { isProd } from "~/iso/env";
import { getExtension } from "~/iso/string";
import { uuid } from "uuidv4";

const allowedMimeTypes = ["video/mp4"];

const WrongMimeTypeDetector: MiddlewareFn = async ({ args }, next) => {
  const { mimetype } = await args.video;
  if (!allowedMimeTypes.includes(mimetype)) {
    // Promise.reject(new Error("Wrong mime type"));
    throw new Error("Invalid file type");
  }
  return await next();
};

@Resolver()
export class VideoUploadResolver {
  @Mutation(() => String)
  @UseMiddleware(WrongMimeTypeDetector)
  async videoUpload(
    @Arg("video", () => GraphQLUpload) video: FileUpload,
    @Arg("forceBucketUpload", () => Boolean, { nullable: true })
    forceBucketUpload: boolean,
  ) {
    video.filename = `${uuid()}.${getExtension(video.filename)}`;

    let fileUrl: string;
    if (isProd() || forceBucketUpload) {
      fileUrl = await saveToBucket(video);
    } else {
      console.log("local configuration: saving to public/localBucket");
      fileUrl = await saveToLocal(video);
    }
    return fileUrl;
  }
}
