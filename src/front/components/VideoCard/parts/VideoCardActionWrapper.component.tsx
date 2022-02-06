import { Card, Spin } from "antd";
import { useRouter } from "next/router";
import { PropsWithChildren, useCallback, useState } from "react";

import { VideoCardAction } from "@/VideoCard/parts";
import { ifConfirmDeleteModal } from "@/VideoCard/parts/modals";
import {
  openDeletedVideodNotification,
  openPublishedVideoNotification,
} from "@/VideoCard/parts/notifications";
import { Video } from "~/@types/generated/graphqlTypes";
import {
  useDeleteVideoMutation,
  usePublishVideoMutation,
} from "~/front/gql/mutations";
import type { useOneUserQuery } from "~/front/gql/queries";
import { openErrorNotification } from "~/front/lib/notifications";

interface Props extends PropsWithChildren<Video> {
  onAction: ReturnType<typeof useOneUserQuery>["refetch"];
}

const minHeight = 370;

export function VideoCardActionWrapper({
  onAction,
  children,
  id,
  published,
  title,
}: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [deleteVideo, { loadingDeleteVideo }] = useDeleteVideoMutation();
  const [setVideoPublished, { loadingPublishVideo }] =
    usePublishVideoMutation();

  const handleEdit = () => !loading && router.push(`/video/edit/${id}`);

  const handleTogglePublic = useCallback(() => {
    if (loading) return;
    setLoading(true);
    setVideoPublished(id, !published)
      .then(() => openPublishedVideoNotification(title, !published))
      .catch(openErrorNotification)
      .finally(() => {
        // prevent little ui glitch
        setTimeout(() => {
          setLoading(false);
        }, 500);
        onAction();
      });
  }, [loading, setVideoPublished, id, published, onAction, title]);

  const handleDelete = useCallback(() => {
    if (loading) return;
    setLoading(true);
    ifConfirmDeleteModal(
      () => {
        deleteVideo(id)
          .then(() => openDeletedVideodNotification(title))
          .catch(openErrorNotification)
          .finally(() => {
            setLoading(false);
            onAction();
          });
      },
      () => setLoading(false),
    );
  }, [deleteVideo, id, loading, onAction, title]);

  const publishAction = published ? (
    <VideoCardAction action={handleTogglePublic} key="lock" name="lock" />
  ) : (
    <VideoCardAction action={handleTogglePublic} key="publish" name="publish" />
  );
  const actions = [
    <VideoCardAction action={handleDelete} key="delete" name="delete" />,
    publishAction,
    <VideoCardAction action={handleEdit} key="edit" name="edit" />,
  ];

  const isLoading = loading || loadingDeleteVideo || loadingPublishVideo;

  return (
    <Card actions={actions} hoverable style={{ minHeight }}>
      {isLoading ? (
        <div
          style={{
            alignItems: "center",
            display: "flex",
            height: minHeight - 35,
            justifyContent: "center",
          }}
        >
          <Spin size="large" />
        </div>
      ) : (
        <div style={{ height: minHeight - 35 }}>{children}</div>
      )}
    </Card>
  );
}
