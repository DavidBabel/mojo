import { Video } from "@prisma/client";
import { Session } from "next-auth";
import { ArgsDictionary } from "type-graphql";

import { UserRole } from "~/iso/enums";

type ExpectedUserObject = Maybe<Session["user"]>;

export function extractId(object: any): string {
  const id = object?.where?.id;
  if (!id) {
    throw new Error("No id found for the requested object");
  }
  return id;
}

export function extractIdEquals(object: any): string {
  const id = object?.where?.id?.equals;
  if (!id) {
    throw new Error("No id.equals found for the requested object");
  }
  return id;
}

export function adminByPass<T extends ExpectedUserObject>(user: T) {
  return user?.role === UserRole.ADMIN;
}

export function noUser<T extends ExpectedUserObject>(user: T) {
  return user?.id === undefined;
}

export function isCurrentRequestedUser<T extends ExpectedUserObject>(
  user: T,
  args: ArgsDictionary,
) {
  const requestedObjectId = extractIdEquals(args);

  return !user?.id || !requestedObjectId || user?.id !== requestedObjectId;
}

export function isCurrentRequestedVideoOwner<T extends ExpectedUserObject>(
  user: T,
  video: Video,
) {
  return user?.id && video.authorId && user?.id !== video.authorId;
}
