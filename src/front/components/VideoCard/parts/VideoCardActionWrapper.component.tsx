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

  const handleEdit = () => !loading && router.push(`/videos/edit/${id}`);

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
  }, [deleteVideo, id, loading, onAction, title]);

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
