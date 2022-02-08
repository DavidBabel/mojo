import { EditOutlined } from "@ant-design/icons";
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
import { useVideoIdRouter } from "~/front/hooks";

const PlayVideoPage: NextPage = () => {
  const { t } = useTranslation();
  const { videoId } = useVideoIdRouter();

  const { data, error, loading } = useOneVideoQuery(videoId);
  const video: Maybe<MaybeNull<Video>> = data?.video;

  const VideoPlayer = useMemoVideoPlayer(videoId, video?.title);
  if (loading || error) {
    return <LoadingOrError error={error} loading={loading} />;
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
      {VideoPlayer}
    </>
  );
};

export default PlayVideoPage;
