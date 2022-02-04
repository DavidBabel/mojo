import { UserAddOutlined, UserOutlined } from "@ant-design/icons";
import type { NextPage } from "next";
import { useTranslation } from "react-i18next";

import { Title } from "@/_layout/Title";
import { ButtonLink } from "@/ButtonLink";

const AuthIndexPage: NextPage = () => {
  const { t } = useTranslation();

  return (
    <>
      <Title>Auth</Title>
      <>
        <ButtonLink href="/auth/signin">
          <UserOutlined /> {t("layout.header.connexion.sign-in")}
        </ButtonLink>
        <ButtonLink href="/auth/register">
          <UserAddOutlined /> {t("layout.header.connexion.register")}
        </ButtonLink>
      </>
    </>
  );
};

export default AuthIndexPage;
