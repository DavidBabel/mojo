import { EditOutlined } from "@ant-design/icons";
import { Col, Row } from "antd";
import type { NextPage } from "next";
import { useTranslation } from "react-i18next";

import { Paragraph } from "@/_layout/antd.exports";
import { Title } from "@/_layout/Title";
import { ButtonLink } from "@/ButtonLink";
import { LoadingOrError } from "@/LoadingOrError";
import { TitleWithActions } from "@/TitleWithActions";
import { useMemoVideoPlayer } from "@/VideoPlayer";
import { Video } from "~/@types/generated/graphqlTypes";
import { useOneVideoQuery } from "~/front/gql/queries";
import { useOnMobile, useVideoIdRouter } from "~/front/hooks";

const PlayVideoPage: NextPage = () => {
  const { t } = useTranslation();
  const { videoId } = useVideoIdRouter();
  const isMobile = useOnMobile();

  const { data, error, loading } = useOneVideoQuery(videoId);
  const video: Maybe<MaybeNull<Video>> = data?.findFirstVideo;

  const VideoPlayer = useMemoVideoPlayer(videoId, video?.title!, {
    small: isMobile,
  });
  if (loading || error) {
    return <LoadingOrError error={error} />;
  }

  const { title, description } = video ?? {};

  const actions = [
    <ButtonLink href={`/videos/edit/${videoId}`} key="action-edit">
      <EditOutlined /> {t("pages.videos-play.edit-video")}
    </ButtonLink>,
  ];

  return (
    <>
      <TitleWithActions
        actions={actions}
        sticky
        title={<Title>{title}</Title>}
      />
      <Paragraph>{description}</Paragraph>
      <Row>
        <Col lg={{ offset: 4, span: 16 }} xs={{ span: 24 }}>
          {VideoPlayer}
        </Col>
      </Row>
    </>
  );
};

export default PlayVideoPage;
