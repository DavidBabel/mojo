import { PlusCircleOutlined } from "@ant-design/icons";
import { Col, Row } from "antd";
import type { NextPage } from "next";
import { useTranslation } from "react-i18next";

import { Paragraph } from "@/_layout/antd.exports";
import { Title } from "@/_layout/Title";
import { ButtonLink } from "@/ButtonLink";
import { LoadingOrError } from "@/LoadingOrError";
import { NoDataFound } from "@/NoDataFound";
import { TitleWithActions } from "@/TitleWithActions";
import { VideoCard } from "@/VideoCard";
import { useOneUserQuery } from "~/front/gql/queries";
import { useSession } from "~/front/hooks";

interface PageProps {
  isAdminMode?: boolean;
  userId?: string;
}

const VideosPage: NextPage<PageProps> = ({ userId, isAdminMode }) => {
  const { user } = useSession();
  const { t } = useTranslation();

  const { loading, data, error, refetch } = useOneUserQuery(userId ?? user?.id);

  if (loading || error) {
    return <LoadingOrError error={error} loading={loading} />;
  }
  const userData = data?.findFirstUser;
  if (!userData) {
    return <NoDataFound dataName={String(t("pages.videos.no-datas"))} />;
  }
  const { name: userName, videos } = userData;

  const actions = isAdminMode
    ? []
    : [
        <ButtonLink
          download={"cat-example.mp4"}
          href={"/cat-example.mp4"}
          key="dl"
        >
          {t("pages.videos.download-example")}
        </ButtonLink>,
        <ButtonLink href={"/videos/upload"} key="action-upload" type="primary">
          <PlusCircleOutlined /> {t("pages.videos.upload-video")}
        </ButtonLink>,
      ];

  return (
    <>
      <TitleWithActions
        actions={actions}
        sticky
        title={
          <Title>
            {isAdminMode
              ? t("pages.videos.title-admin", { userName })
              : t("pages.videos.title")}
          </Title>
        }
      />

      <Row gutter={[20, 20]}>
        {videos.map((video, index) => (
          <Col key={`videos-video-${index}`} lg={12} sm={24} xl={8} xxl={6}>
            <VideoCard {...video} onAction={refetch} />
          </Col>
        ))}
        {videos.length === 0 && (
          <Col>
            <Paragraph>{t("pages.videos.no-videos")}</Paragraph>
            <ButtonLink href={"/videos/upload"} type="primary">
              <PlusCircleOutlined /> {t("pages.videos.upload-video")}
            </ButtonLink>
          </Col>
        )}
      </Row>
    </>
  );
};

export default VideosPage;
