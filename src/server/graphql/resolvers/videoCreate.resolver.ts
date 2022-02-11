import { Video } from "@prisma/client";
import { FileUpload, GraphQLUpload } from "graphql-upload";
import {
  Arg,
  Authorized,
  Ctx,
  Mutation,
  Resolver,
  UseMiddleware as UseGuards,
} from "type-graphql";

import { videoTitleRequired } from "~/iso/constant";
import { UserRole } from "~/iso/enums";
import { isProd } from "~/iso/env";
import { OrmError, VideoUploadError } from "~/iso/errors/customErrors";
import { getExtension } from "~/iso/string";
import { Context, EnsuredUser } from "~/server/graphql/graphql-context";
import { LoggedIn, videoMimeTypeGuard } from "~/server/graphql/guards";
import { saveToBucket, saveToLocal } from "~/server/services/imageUpload";
import { logger } from "~/server/services/logger";

@Resolver()
export class VideoCreateResolver {
  @LoggedIn()
  @Authorized([UserRole.ADMIN, UserRole.USER])
  @Mutation(() => String)
  @UseGuards(videoMimeTypeGuard)
  async videoCreate(
    @Ctx() { prisma, user }: EnsuredUser<Context>,
    @Arg("video", () => GraphQLUpload) video: FileUpload,
    @Arg("published", () => Boolean) published: boolean,
    @Arg("title", () => String, { nullable: !videoTitleRequired })
    title?: string,
    @Arg("description", () => String, { nullable: true }) description?: string,
    @Arg("forceBucketUpload", () => Boolean, { nullable: true })
    forceBucketUpload?: boolean,
  ) {
    let newVideo: MaybeNull<Video> = null;
    try {
      newVideo = await prisma.video.create({
        data: {
          authorId: user.id,
          description,
          published,
          title,
        },
      });
    } catch (error: any) {
      logger.error(error?.message, error);
      throw new OrmError("unable-to-create-video");
    }
    if (!newVideo) {
      throw new OrmError("unable-to-retreive-created-video");
    }

    video.filename = `${newVideo.id}.${getExtension(video.filename)}`;

    if (isProd() || forceBucketUpload) {
      try {
        await saveToBucket(video);
      } catch (error: any) {
        logger.error(error.message, error);
        throw new VideoUploadError("unable-to-upload-the-video");
      }
    } else {
      logger.info("local configuration: saving to public/localBucket");
      try {
        await saveToLocal(video);
      } catch (error: any) {
        logger.error(error?.message, error);
        throw new VideoUploadError("unable-to-upload-the-video-locally");
      }
    }
    return newVideo.id;
  }
}
