import { FileUpload,GraphQLUpload } from "graphql-upload";
import {
  Arg,
  MiddlewareFn,
  Mutation,
  Resolver,
  UseMiddleware,
} from "type-graphql";
import { v4 as uuidv4 } from "uuid";

import { isProd } from "~/iso/env";
import { getExtension } from "~/iso/string";
import { saveToBucket,saveToLocal } from "~/server/services/imageUpload";

const allowedMimeTypes = ["video/mp4"];

const WrongMimeTypeDetector: MiddlewareFn = async (args, next) => {
  console.log(args);
  // const { mimetype } = await args.video;
  // if (!allowedMimeTypes.includes(mimetype)) {
  //   throw new Error("Invalid file type");
  // }
  return next();
  // return await next();
};

@Resolver()
export class VideoUploadResolver {
  @Mutation(type => String)
  // @UseMiddleware(WrongMimeTypeDetector)
  async videoUpload(
    @Arg("video", type => GraphQLUpload) video: FileUpload,
    @Arg("forceBucketUpload", type => Boolean, { nullable: true })
    forceBucketUpload: boolean,
  ) {
    video.filename = `${uuidv4()}.${getExtension(video.filename)}`;

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
