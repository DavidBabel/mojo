import type { NextPage } from "next";
import { useTranslation } from "react-i18next";

import styles from "~/front/styles/Home.module.css";

const Home: NextPage = () => {
  const { t } = useTranslation();

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>
          {t("pages.home.welcome-to")}{" "}
          <a href="https://www.mojo-app.com/">Mojo!</a>
        </h1>
      </main>
    </div>
  );
};

export default Home;
