import { Badge, Card, Typography } from "antd";
import dynamicImport from "next/dynamic";
import Link from "next/link";
import { useTranslation } from "react-i18next";

import { Title } from "@/_layout/Title";
import { VideoCardActionWrapper } from "@/VideoCard/parts";
import type { VideoPlayerProps } from "@/VideoPlayerNoSSR";
import { Video } from "~/@types/generated/graphqlTypes";
import type { useOneUserQuery } from "~/front/gql/queries";
import { CONFIG } from "~/iso/config";
import { formatDate } from "~/iso/dates";
import { truncateWithEllipses } from "~/iso/string";

const { Paragraph } = Typography;

const VideoPlayer = dynamicImport<VideoPlayerProps>(
  () =>
    import("~/front/components/VideoPlayerNoSSR").then(
      mod => mod.VideoPlayerNoSSR,
    ),
  {
    ssr: false,
  },
);

interface Props extends Video {
  onAction: ReturnType<typeof useOneUserQuery>["refetch"];
}

export function VideoCard(props: Props) {
  const { id, title, description, published, createdAt } = props;
  const { t } = useTranslation();

  const demoId = title.endsWith(" - demo") ? CONFIG.DEMO_VIDEO_ID : id;
  const realTitle = title.replace(" - demo", "");

  return (
    <VideoCardActionWrapper {...props}>
      <Badge.Ribbon
        color="pink"
        style={{
          display: published ? "block" : "none",
          marginRight: -25,
          marginTop: -20,
        }}
        text={t("common.public")}
      >
        <Title level={4}>
          <Link href={`/videos/${id}`}>{realTitle}</Link>
        </Title>
      </Badge.Ribbon>
      <Paragraph>
        <VideoPlayer
          small
          videoUrl={`https://storage.googleapis.com/mojo-dev/${demoId}.mp4`}
        />
      </Paragraph>
      <Card.Meta
        description={
          description && (
            <div style={{ minHeight: 66 }}>
              {truncateWithEllipses(description, 100)}
            </div>
          )
        }
        title={t("components.VideoCard.created-at", {
          date: formatDate(createdAt),
        })}
      />
    </VideoCardActionWrapper>
  );
}
