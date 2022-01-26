// https://daily-dev-tips.com/posts/seeding-a-prisma-database-in-nextjs/

import { PrismaClient } from "@prisma/client";

import { users } from "./User.seeds";

const prisma = new PrismaClient();

async function main() {
  for (const user of users) {
    const userCreated = await prisma.user.create({
      data: user,
    });
    console.log(`Created user with id: ${userCreated.id}`);
  }
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
