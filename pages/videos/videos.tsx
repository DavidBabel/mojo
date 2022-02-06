import { PlusCircleOutlined } from "@ant-design/icons";
import { Col, Row, Typography } from "antd";
import type { NextPage } from "next";
import { useTranslation } from "react-i18next";

import { Title } from "@/_layout/Title";
import { ButtonLink } from "@/ButtonLink";
import { LoadingOrError } from "@/LoadingOrError";
import { NoDataFound } from "@/NoDataFound";
import { VideoCard } from "@/VideoCard";
import { useOneUserQuery } from "~/front/gql/queries";
import { useSession } from "~/front/hooks";

const { Paragraph } = Typography;

const VideosPage: NextPage = () => {
  const { user } = useSession();
  const { t } = useTranslation();

  const { loading, data, error, refetch } = useOneUserQuery(user?.id);

  if (loading || error) {
    return <LoadingOrError error={error} loading={loading} />;
  }
  const userData = data?.findFirstUser;
  if (!userData) {
    return <NoDataFound dataName={String(t("pages.videos.no-datas"))} />;
  }

  const uploadVideoButton = (
    <ButtonLink href={"/videos/upload"} type="primary">
      <PlusCircleOutlined /> {t("pages.videos.upload-video")}
    </ButtonLink>
  );

  return (
    <>
      <Title>
        {t("pages.videos.title")}
        <div style={{ display: "flex", float: "right", gap: 20 }}>
          <ButtonLink download={"cat-example.mp4"} href={"/cat-example.mp4"}>
            {t("pages.videos.download-example")}
          </ButtonLink>
          {uploadVideoButton}
        </div>
      </Title>
      <Row gutter={[20, 20]}>
        {userData.videos.map((video, index) => (
          <Col key={`videos-video-${index}`} lg={8} md={12} sm={24} xxl={6}>
            <VideoCard {...video} onAction={refetch} />
          </Col>
        ))}
        {userData.videos.length === 0 && (
          <Col>
            <Paragraph>{t("pages.videos.no-videos")}</Paragraph>
            {uploadVideoButton}
          </Col>
        )}
      </Row>
    </>
  );
};

export default VideosPage;
