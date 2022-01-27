import { PrismaClient } from "@prisma/client";
import type { NextPage } from "next";
import Head from "next/head";
import styles from "~/front/styles/Home.module.css";

export const getServerSideProps = async () => {
  const prisma = new PrismaClient();

  const users = await prisma.user.findMany();

  return {
    props: {
      users,
    },
  };
};

type PageProps = InferSSRProps<typeof getServerSideProps>;

const Home: NextPage<PageProps> = ({ users }) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Mojo Web</title>
        <meta name="description" content="A badass app" />
        <link rel="icon" type="image/png" href="/mojo.png" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://www.mojo-app.com/">Mojo!</a>
        </h1>

        <p className={styles.description}>List of users in database :</p>

        <div>
          {users.map(user => (
            <div key={`${user.id}`}>{user.name}</div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Home;
