import { UserAddOutlined, UserOutlined } from "@ant-design/icons";
import { Typography } from "antd";
import type { NextPage } from "next";
import { useTranslation } from "react-i18next";

import { FormContentWrapper } from "@/_form";
import { Title } from "@/_layout/Title";
import { ButtonLink } from "@/ButtonLink";

const { Paragraph } = Typography;

const AuthIndexPage: NextPage = () => {
  const { t } = useTranslation();

  return (
    <>
      <Title>{t("pages.auth.title")}</Title>
      <Paragraph>{t("pages.auth.description")}</Paragraph>
      <FormContentWrapper>
        <ButtonLink href="/auth/signin">
          <UserOutlined /> {t("layout.header.connexion.sign-in")}
        </ButtonLink>
        <ButtonLink href="/auth/register">
          <UserAddOutlined /> {t("layout.header.connexion.register")}
        </ButtonLink>
      </FormContentWrapper>
    </>
  );
};

export default AuthIndexPage;
