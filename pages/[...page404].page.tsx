import type { NextPage } from "next";
import { useTranslation } from "react-i18next";

import { Title } from "@/_layout/Title";

const Page404: NextPage = () => {
  const { t } = useTranslation();
  return (
    <>
      <Title>{t("pages.404.title")}</Title>
      <p>{t("pages.404.description")}</p>
    </>
  );
};

export default Page404;
