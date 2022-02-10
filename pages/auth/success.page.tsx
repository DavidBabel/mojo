import {
  InboxOutlined,
  UserAddOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Col, Result, Row } from "antd";
import type { NextPage } from "next";
import { useTranslation } from "react-i18next";

import { Title } from "@/_layout/Title";
import { BigButton } from "@/BigButton";
import { LoadingOrError } from "@/LoadingOrError";
import { useSession } from "~/front/hooks";

const AuthSuccessPage: NextPage = () => {
  const { t } = useTranslation();
  const { isAuthenticated, sessionLoading } = useSession();

  if (sessionLoading) {
    return <LoadingOrError />;
  }

  if (isAuthenticated()) {
    return (
      <>
        <Title>{t("pages.auth-success.signin.title")}</Title>
        <Row gutter={[12, 12]}>
          <Col span={24}>
            <Result
              status="success"
              subTitle={t("pages.auth-success.signin.success-description")}
              title={t("pages.auth-success.signin.success-title")}
            />
          </Col>
          <Col xl={{ offset: 4, span: 8 }} xs={24}>
            <BigButton href={`/videos`} icon={<VideoCameraOutlined />}>
              {t("pages.auth-success.signin.goto-videos")}
            </BigButton>
          </Col>
          <Col xl={8} xs={24}>
            <BigButton href={`/videos/upload`} icon={<InboxOutlined />}>
              {t("pages.auth-success.signin.upload-a-video")}
            </BigButton>
          </Col>
        </Row>
      </>
    );
  }
  return (
    <>
      <Title>{t("pages.auth-success.signout.title")}</Title>
      <Row gutter={[12, 12]}>
        <Col span={24}>
          <Result
            status="success"
            subTitle={t("pages.auth-success.signout.success-description")}
            title={t("pages.auth-success.signout.success-title")}
          />
        </Col>
        <Col xl={{ offset: 8, span: 8 }} xs={24}>
          <BigButton href={`/auth/signin`} icon={<UserAddOutlined />}>
            {t("pages.auth-success.signout.goto-signin")}
          </BigButton>
        </Col>
      </Row>
    </>
  );
};

export default AuthSuccessPage;
