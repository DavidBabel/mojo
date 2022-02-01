import { PrismaClient, User } from "@prisma/client";
import type { NextPage } from "next";

export const getServerSideProps = async () => {
  const prisma = new PrismaClient();

  const users = await prisma.user.findMany();

  await prisma.$disconnect();

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
      <p>List of users in database thru prisma :</p>

      <div>
        {users.map((user: User) => (
          <div key={`${user.id}`}>{user.name}</div>
        ))}
      </div>
    </>
  );
};

export default DbPage;
