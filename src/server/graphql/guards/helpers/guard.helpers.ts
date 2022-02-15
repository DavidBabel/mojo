import { Video } from "@prisma/client";
import { Session } from "next-auth";
import { ArgsDictionary } from "type-graphql";

import { UserRole } from "~/iso/enums";
import { GraphQLCustomError } from "~/server/errors";

type ExpectedUserObject = Maybe<Session["user"]>;

function extractId(args: ArgsDictionary): string {
  const id = args?.where?.id;
  return id;
}

function extractIdEquals(args: ArgsDictionary): string {
  const id = args?.where?.id?.equals;
  return id;
}

export function extractRequestedId(args: ArgsDictionary): string {
  const requestedObjectIdEquals = extractIdEquals(args);
  const requestedObjectId = extractId(args);

  const testedId = requestedObjectIdEquals ?? requestedObjectId;
  if (!testedId) {
    throw new GraphQLCustomError("no-id-found-for-requested-object");
  }
  return testedId;
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
  if (adminByPass(user)) {
    return true;
  }
  const id = extractRequestedId(args);
  return !user?.id || !id || user?.id !== id;
}

export function isCurrentRequestedVideoOwner<T extends ExpectedUserObject>(
  user: T,
  video: Video,
) {
  return user?.id && video.authorId && user?.id !== video.authorId;
}
