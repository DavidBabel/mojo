import {
  EyeOutlined,
  InboxOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Col, Result, Row } from "antd";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";

import { Title } from "@/_layout/Title";
import { BigButton } from "@/BigButton";

const UploadVideoSuccessPage: NextPage = () => {
  const { t } = useTranslation();
  const router = useRouter();

  const { videoId, videoTitle: existingVideoTitle } = router.query;
  const videoTitle = existingVideoTitle
    ? `"${existingVideoTitle}"`
    : String(t("pages.videos-upload-success.video"));

  return (
    <>
      <Title>{t("pages.videos-upload-success.title", { videoTitle })}</Title>

      <Row gutter={[12, 12]}>
        <Col span={24}>
          <Result
            status="success"
            subTitle={t("pages.videos-upload-success.success-description")}
            title={t("pages.videos-upload-success.success-title")}
          />
        </Col>
        <Col xl={8} xs={24}>
          <BigButton href={`/videos/${videoId}`} icon={<EyeOutlined />}>
            {t("pages.videos-upload-success.play-video")}
          </BigButton>
        </Col>
        <Col xl={8} xs={24}>
          <BigButton href={`/videos`} icon={<VideoCameraOutlined />}>
            {t("pages.videos-upload-success.goto-videos")}
          </BigButton>
        </Col>
        <Col xl={8} xs={24}>
          <BigButton
            icon={<InboxOutlined />}
            onClick={() => router.push("/videos/upload")}
          >
            {t("pages.videos-upload-success.upload-another-one")}
          </BigButton>
        </Col>
      </Row>
    </>
  );
};

export default UploadVideoSuccessPage;
