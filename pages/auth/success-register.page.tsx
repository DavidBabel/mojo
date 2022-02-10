import { UserAddOutlined } from "@ant-design/icons";
import { Col, Result, Row } from "antd";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";

import { Title } from "@/_layout/Title";
import { BigButton } from "@/BigButton";

const AuthSuccessPage: NextPage = () => {
  const { t } = useTranslation();
  const { query } = useRouter();

  const registeredEmail = query.email;

  return (
    <>
      <Title>{t("pages.auth-success-register.title")}</Title>
      <Row gutter={[12, 12]}>
        <Col span={24}>
          <Result
            status="success"
            subTitle={t("pages.auth-success-register.success-description")}
            title={t("pages.auth-success-register.success-title", {
              registeredEmail,
            })}
          />
        </Col>
        <Col xl={{ offset: 8, span: 8 }} xs={24}>
          <BigButton href={`/auth/signin`} icon={<UserAddOutlined />}>
            {t("pages.auth-success-register.goto-signin")}
          </BigButton>
        </Col>
      </Row>
    </>
  );
};

export default AuthSuccessPage;
