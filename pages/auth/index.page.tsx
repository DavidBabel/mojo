import { UserAddOutlined, UserOutlined } from "@ant-design/icons";
import { Col, Row } from "antd";
import type { NextPage } from "next";
import { useTranslation } from "react-i18next";

import { Paragraph } from "@/_layout/antd.exports";
import { Title } from "@/_layout/Title";
import { BigButton } from "@/BigButton";

const AuthIndexPage: NextPage = () => {
  const { t } = useTranslation();

  return (
    <>
      <Title>{t("pages.auth.title")}</Title>
      <Paragraph>{t("pages.auth.description")}</Paragraph>
      <Row gutter={[12, 12]}>
        <Col lg={{ offset: 4, span: 8 }} xs={24}>
          <BigButton href="/auth/signin" icon={<UserOutlined />}>
            {t("layout.header.connexion.sign-in")}
          </BigButton>
        </Col>
        <Col lg={{ span: 8 }} xs={24}>
          <BigButton href="/auth/register" icon={<UserAddOutlined />}>
            {t("layout.header.connexion.register")}
          </BigButton>
        </Col>
      </Row>
    </>
  );
};

export default AuthIndexPage;
