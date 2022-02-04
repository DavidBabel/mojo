import faker from "@faker-js/faker";
import { Prisma } from "@prisma/client";

import { UserRole } from "~/iso/enums";
import { hashPassword } from "~/server/services/password/hash-password.service";

const getFakeVideos = () =>
  Array(faker.datatype.number({ max: 6, min: 2 }))
    .fill(0)
    .map(() => ({
      createdAt: faker.date.past(1),
      description: faker.lorem.paragraph(),
      published: faker.datatype.boolean(),
      title: faker.music.genre(),
      updatedAt: faker.date.past(0.1),
    }));

const getFakeUser = (forceName?: string, forceRole?: UserRole) => ({
  email: forceName ? `${forceName}@${forceName}.io` : faker.internet.email(),
  name: forceName ?? faker.name.findName(),
  password: hashPassword(forceName ? forceName : faker.internet.password()),
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
