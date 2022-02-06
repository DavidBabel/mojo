// https://prisma.typegraphql.com/docs/advanced/additional-decorators

import { ResolversEnhanceMap } from "@generated/type-graphql";
import { Authorized } from "type-graphql";
import { MethodAndPropDecorator } from "type-graphql/dist/decorators/types";

import { UserRole } from "~/iso/enums";
import {
  NoOneDecorator,
  SelfUserOnlyDecorator,
  SelfVideoOnlyDecorator,
} from "~/server/graphql/guards";

// this file apply typegraphql & custom decorators to the generated resolvers 🤌

const NoOne = [NoOneDecorator()];
const Admin = [Authorized(UserRole.ADMIN)];
const SelfUserOnly = [SelfUserOnlyDecorator()];
const SelfVideoOnly = [SelfVideoOnlyDecorator()];
const LoggedIn = [Authorized(UserRole.ADMIN, UserRole.USER)];
const EveryOne: MethodAndPropDecorator[] = [];

export const accessRightEnhancement: ResolversEnhanceMap = {
  /* eslint-disable sort-keys-fix/sort-keys-fix */
  User: {
    // mutations
    createUser: NoOne, // use RegisterResolver instead
    deleteManyUser: NoOne,
    deleteUser: SelfUserOnly,
    updateManyUser: Admin,
    updateUser: SelfUserOnly,
    upsertUser: Admin,

    // queries
    aggregateUser: Admin,
    findFirstUser: SelfUserOnly,
    groupByUser: Admin,
    user: SelfUserOnly,
    users: Admin,
  },

  Video: {
    // mutations
    createVideo: SelfVideoOnly,
    deleteManyVideo: SelfVideoOnly,
    deleteVideo: SelfVideoOnly,
    updateManyVideo: SelfVideoOnly,
    updateVideo: SelfVideoOnly,
    upsertVideo: SelfVideoOnly,

    // queries
    aggregateVideo: Admin,
    findFirstVideo: LoggedIn,
    groupByVideo: Admin,
    video: LoggedIn,
    videos: LoggedIn,
  },
};
