import type { NextPage } from "next";

import styles from "~/front/styles/Home.module.css";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://www.mojo-app.com/">Mojo!</a>
        </h1>
      </main>
    </div>
  );
};

export default Home;
