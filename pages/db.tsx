import { User } from "@prisma/client";
import type { NextPage } from "next";

import { PrismaClient } from "~/server/prisma/singleton";

export const getServerSideProps = async () => {
  const users = await PrismaClient.user.findMany();

  // await prisma.$disconnect();

  return {
    props: {
      users,
    },
  };
};

type PageProps = InferSSRProps<typeof getServerSideProps>;

const DbPage: NextPage<PageProps> = ({ users }) => {
  return (
    <>
      <p>List of users in database through prisma :</p>

      <div>
        {users.map((user: User) => (
          <div key={`${user.id}`}>{user.name}</div>
        ))}
      </div>
    </>
  );
};

export default DbPage;
