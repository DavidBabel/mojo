import type { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";

import { Title } from "@/_layout/Title";

const AuthErroPage: NextPage = () => {
  const { t } = useTranslation();
  const { query } = useRouter();
  return (
    <>
      <Title>{t("pages.auth-error.title")}</Title>
      <p>
        {t("pages.auth-error.description")}{" "}
        <Link href="/auth/signin">{t("pages.auth-error.please-retry")}</Link>
      </p>
      <p>
        {t("pages.auth-error.error")} {query?.error}
      </p>
    </>
  );
};

export default AuthErroPage;
