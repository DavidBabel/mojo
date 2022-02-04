import { FileUpload, GraphQLUpload } from "graphql-upload";
import {
  Arg,
  Authorized,
  Mutation,
  Resolver,
  UseMiddleware,
} from "type-graphql";
import { v4 as uuidv4 } from "uuid";

import { UserRole } from "~/iso/enums";
import { isProd } from "~/iso/env";
import { getExtension } from "~/iso/string";
import { mimeTypeGuard } from "~/server/graphql/guards";
import { saveToBucket, saveToLocal } from "~/server/services/imageUpload";

@Resolver()
export class VideoUploadResolver {
  @Authorized([UserRole.ADMIN, UserRole.USER])
  @Mutation(() => String)
  @UseMiddleware(mimeTypeGuard)
  async videoUpload(
    @Arg("video", () => GraphQLUpload) video: FileUpload,
    @Arg("forceBucketUpload", () => Boolean, { nullable: true })
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
