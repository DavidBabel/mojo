import { Card, Spin } from "antd";
import { useRouter } from "next/router";
import { PropsWithChildren, useCallback, useState } from "react";
import { useTranslation } from "react-i18next";

import { VideoCardAction } from "@/VideoCard/parts";
import { Video } from "~/@types/generated/graphqlTypes";
import {
  useDeleteVideoMutation,
  usePublishVideoMutation,
} from "~/front/gql/mutations";
import type { useOneUserQuery } from "~/front/gql/queries";
import { openErrorNotification } from "~/front/lib/notifications";
import { ifConfirmDeleteModal } from "~/front/modals/modals";
import {
  openDeletedVideodNotification,
  openPublishedVideoNotification,
} from "~/pages/videos/part/notifications";

interface Props extends PropsWithChildren<Video> {
  onAction: ReturnType<typeof useOneUserQuery>["refetch"];
}

export function VideoCardActionWrapper({
  onAction,
  children,
  id,
  published,
  title: maybeTitle,
}: Props) {
  const router = useRouter();
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);

  const [deleteVideo, { loadingDeleteVideo }] = useDeleteVideoMutation();
  const [setVideoPublished, { loadingPublishVideo }] =
    usePublishVideoMutation();

  const handleEdit = () => !loading && router.push(`/videos/edit/${id}`);

  const title = maybeTitle ?? t("pages.videos.no-title");

  const handleTogglePublic = useCallback(() => {
    if (loading) return;
    setLoading(true);
    setVideoPublished(id, !published)
      .then(() => openPublishedVideoNotification(title, !published))
      .catch(openErrorNotification)
      .finally(async () => {
        // prevent little ui glitch
        setTimeout(() => {
          setLoading(false);
        }, 500);
        await onAction();
      });
  }, [loading, setVideoPublished, id, published, onAction, title]);

  const handleDelete = useCallback(() => {
    if (loading) return;
    setLoading(true);
    ifConfirmDeleteModal(
      t("pages.videos.modals.confirm-delete"),
      () => {
        deleteVideo(id)
          .then(() => openDeletedVideodNotification(title))
          .catch(openErrorNotification)
          .finally(async () => {
            setLoading(false);
            await onAction();
          });
      },
      () => setLoading(false),
    );
  }, [deleteVideo, id, loading, onAction, title, t]);

  const actions = [
    <VideoCardAction action={handleDelete} key="delete" name="delete" />,
    <VideoCardAction
      action={handleTogglePublic}
      key="publish"
      name={published ? "publish" : "lock"}
    />,
    <VideoCardAction action={handleEdit} key="edit" name="edit" />,
  ];

  const isLoading = loading || loadingDeleteVideo || loadingPublishVideo;

  return (
    <Card actions={actions} hoverable>
      {isLoading && (
        <div
          style={{
            float: "left",
            marginLeft: "48%",
            position: "relative",
          }}
        >
          <Spin size="large" style={{ position: "absolute", top: 140 }} />
        </div>
      )}
      <div style={{ opacity: isLoading ? 0 : 100 }}>{children}</div>
    </Card>
  );
}
