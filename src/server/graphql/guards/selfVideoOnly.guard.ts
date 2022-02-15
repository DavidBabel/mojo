import { Video } from "@prisma/client";
import { createMethodDecorator, MiddlewareFn } from "type-graphql";

import { NotFoundError, RightsError } from "~/server/errors";
import { Context } from "~/server/graphql/graphql-context";
import {
  adminByPass,
  extractRequestedId,
  isCurrentRequestedVideoOwner,
} from "~/server/graphql/guards/helpers/guard.helpers";
import { logger } from "~/server/services/logger";

export const selfVideoOnlyGuard: MiddlewareFn<Context> = async (
  { context, args },
  next,
) => {
  const { user, prisma } = context;

  if (adminByPass(user)) {
    return await next();
  }

  const videoId = extractRequestedId(args);
  let video: MaybeNull<Video>;
  try {
    video = await prisma.video.findUnique({ where: { id: videoId } });
  } catch (error) {
    logger.error("Prisma error", error);
    throw error;
  }

  if (!video) {
    throw new NotFoundError("video-not-found");
  }

  if (isCurrentRequestedVideoOwner(user, video)) {
    throw new RightsError("user-can-only-edit-own-video");
  }

  return await next();
};

export function SelfVideoOnlyDecorator() {
  return createMethodDecorator<Context>(selfVideoOnlyGuard);
}
