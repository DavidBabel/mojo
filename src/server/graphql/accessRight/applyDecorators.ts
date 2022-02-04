// https://prisma.typegraphql.com/docs/advanced/additional-decorators

import { ResolversEnhanceMap } from "@generated/type-graphql";
import { Authorized } from "type-graphql";

import { UserRole } from "~/iso/enums";

export const accessRightEnhancement: ResolversEnhanceMap = {
  User: {
    _all: [Authorized(UserRole.ADMIN)],
  },

  Video: {
    _all: [Authorized(UserRole.USER)],
    // deleteManyVideo: [Authorized(UserRole.ADMIN)],
    // deleteVideo: [Authorized(UserRole.ADMIN)],
    // video: [Authorized(UserRole.USER)],
    // videos: [Authorized(UserRole.USER)],
  },
};
