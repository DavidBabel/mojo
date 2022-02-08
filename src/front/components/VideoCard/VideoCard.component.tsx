import { Card } from "antd";
import Link from "next/link";
import { useTranslation } from "react-i18next";

import { Paragraph, Ribbon } from "@/_layout/antd.exports";
import { Title } from "@/_layout/Title";
import { VideoCardActionWrapper } from "@/VideoCard/parts";
import { useMemoVideoPlayer } from "@/VideoPlayer";
import { Video } from "~/@types/generated/graphqlTypes";
import type { useOneUserQuery } from "~/front/gql/queries";
import { formatDate } from "~/iso/dates";
import { truncateWithEllipses } from "~/iso/string";

interface Props extends Video {
  onAction: ReturnType<typeof useOneUserQuery>["refetch"];
}

export function VideoCard(props: Props) {
  const { id, title, description, published, createdAt } = props;
  const { t } = useTranslation();

  const VideoPlayer = useMemoVideoPlayer(id, title, { small: true });

  return (
    <VideoCardActionWrapper {...props}>
      <Ribbon
        color="pink"
        style={{
          display: published ? "block" : "none",
          marginRight: -25,
          marginTop: -20,
        }}
        text={t("common.public")}
      >
        <Title level={4}>
          <Link href={`/videos/${id}`}>{title}</Link>
        </Title>
      </Ribbon>
      {VideoPlayer}
      <Card.Meta
        description={
          <Paragraph style={{ minHeight: 63 }}>
            {description && truncateWithEllipses(description, 100)}
          </Paragraph>
        }
        style={{ marginTop: 7 }}
        title={t("components.VideoCard.created-at", {
          date: formatDate(createdAt),
        })}
      />
    </VideoCardActionWrapper>
  );
}
