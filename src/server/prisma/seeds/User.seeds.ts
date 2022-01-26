import { Prisma } from "@prisma/client";
import faker from "@faker-js/faker";

import { hashPassword } from "~/server/services/password/hash-password.service";
import { UserRole } from "~/server/prisma/enums";

const getFakeVideos = () =>
  Array(faker.datatype.number({ min: 2, max: 6 }))
    .fill(0)
    .map(() => ({
      title: faker.music.genre(),
      description: faker.lorem.paragraph(),
      published: faker.datatype.boolean(),
      createdAt: faker.date.past(1),
      updatedAt: faker.date.past(0.1),
    }));

const getFakeUser = (forceName?: string, forceRole?: UserRole) => ({
  name: forceName ?? faker.name.findName(),
  email: forceName ? `${forceName}@${forceName}.io` : faker.internet.email(),
  password: forceName ? hashPassword(forceName) : faker.internet.password(),
  role: forceRole ?? faker.random.arrayElement([UserRole.ADMIN, UserRole.USER]),
  videos: {
    create: getFakeVideos(),
  },
});

const users: Prisma.UserCreateInput[] = [
  getFakeUser("admin", UserRole.ADMIN),
  getFakeUser("user", UserRole.USER),
  ...Array(15)
    .fill(0)
    .map(() => getFakeUser()),
];

export { users };
