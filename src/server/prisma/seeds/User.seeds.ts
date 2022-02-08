import faker from "@faker-js/faker";
import { Prisma } from "@prisma/client";

import { UserRole } from "~/iso/enums";
import { hashPassword } from "~/server/services/hash-password";

const getFakeVideos = (addMoreVideos: number = 0) =>
  Array(
    faker.datatype.number({ max: 6 + addMoreVideos, min: 2 + addMoreVideos }),
  )
    .fill(0)
    .map(() => ({
      createdAt: faker.date.past(1),
      description: faker.lorem.paragraph(),
      published: faker.datatype.boolean(),
      title: faker.music.genre() + " - demo",
      updatedAt: faker.date.past(0.1),
    }));

const getFakeUser = (
  forceName?: string,
  forceRole?: UserRole,
  addMoreVideos?: number,
) => ({
  email: forceName ? `${forceName}@${forceName}.io` : faker.internet.email(),
  name: forceName ?? faker.name.findName(),
  password: hashPassword(forceName ? forceName : faker.internet.password()),
  role: forceRole ?? faker.random.arrayElement([UserRole.ADMIN, UserRole.USER]),
  videos: {
    create: getFakeVideos(addMoreVideos),
  },
});

const users: Prisma.UserCreateInput[] = [
  getFakeUser("admin", UserRole.ADMIN),
  getFakeUser("user", UserRole.USER, 10),
  ...Array(15)
    .fill(0)
    .map(() => getFakeUser()),
];

export { users };
