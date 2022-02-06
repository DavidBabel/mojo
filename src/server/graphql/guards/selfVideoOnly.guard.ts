import { Video } from "@prisma/client";
import { createMethodDecorator, MiddlewareFn } from "type-graphql";

import { Context } from "~/server/graphql/graphql-context";
import {
  adminByPass,
  extractId,
  isCurrentRequestedVideoOwner,
} from "~/server/graphql/guards/helpers/guard.helpers";

export const selfVideoOnlyGuard: MiddlewareFn<Context> = async (
  { context, args },
  next,
) => {
  const { user, prisma } = context;

  if (adminByPass(user)) {
    return await next();
  }

  const videoId = extractId(args);
  let video: MaybeNull<Video>;
  try {
    video = await prisma.video.findUnique({ where: { id: videoId } });
  } catch (error) {
    console.error("Prisma error", error);
    throw error;
  }

  if (!video) {
    throw new Error("Video not found");
  }

  if (isCurrentRequestedVideoOwner(user, video)) {
    throw new Error("A user can only edit it's own videos");
  }

  return await next();
};

export function SelfVideoOnlyDecorator() {
  return createMethodDecorator<Context>(selfVideoOnlyGuard);
}
