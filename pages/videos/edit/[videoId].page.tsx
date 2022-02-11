import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Input, Switch } from "antd";
import type { NextPage } from "next";
import Link from "next/link";
import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";

import { Form, FormContent, FormItem, SubmitButton } from "@/_form";
import { Paragraph } from "@/_layout/antd.exports";
import { Title } from "@/_layout/Title";
import { LoadingOrError } from "@/LoadingOrError";
import { useMemoVideoPlayer } from "@/VideoPlayer";
import { Video, VideoUpdateInput } from "~/@types/generated/graphqlTypes";
import {
  useDeleteVideoMutation,
  useVideoUpdateMutation,
} from "~/front/gql/mutations";
import { useOneVideoQuery } from "~/front/gql/queries";
import { useVideoIdRouter } from "~/front/hooks";
import {
  openErrorNotification,
  openSuccessNotification,
} from "~/front/lib/notifications";
import { ifConfirmDeleteModal } from "~/front/modals/modals";
import { openDeletedVideodNotification } from "~/pages/videos/part/notifications";

const EditVideoPage: NextPage = () => {
  const { t } = useTranslation();
  const { videoId, router } = useVideoIdRouter();

  const [loadingDelete, setLoadingDelete] = useState(false);
  const [justSaved, setJustSaved] = useState(false);
  const [deleteVideo] = useDeleteVideoMutation();
  const [updateVideo, { loadingVideoUpdate }] = useVideoUpdateMutation();

  const {
    data,
    error,
    loading: loadingVideoQuery,
    refetch,
  } = useOneVideoQuery(videoId);
  const video: MaybeNull<Maybe<Video>> = data?.findFirstVideo;
  const title = video?.title ?? t("pages.videos.no-title");

  const VideoPlayer = useMemoVideoPlayer(videoId, title, {
    small: true,
  });

  const onVideoEdit = useCallback(
    async function handleEditVideo(values: VideoUpdateInput) {
      setJustSaved(false);
      await updateVideo(videoId, values)
        .then(async () => {
          openSuccessNotification(
            t("pages.videos-edit.notifications.edit-success"),
          );
          setJustSaved(true);
          await refetch();
        })
        .catch(openErrorNotification)
        .finally();
    },
    [refetch, t, updateVideo, videoId],
  );

  const handleDelete = useCallback(async () => {
    setJustSaved(false);
    setLoadingDelete(true);
    ifConfirmDeleteModal(
      t("pages.videos.modals.confirm-delete"),
      () => {
        deleteVideo(videoId)
          .then(() => openDeletedVideodNotification(title))
          .catch(openErrorNotification)
          .finally(async () => {
            setLoadingDelete(false);
            setTimeout(() => router.push("/videos"), 1500);
          });
      },
      () => setLoadingDelete(false),
    );
  }, [deleteVideo, router, t, title, videoId]);

  if (loadingVideoQuery || error) {
    return <LoadingOrError error={error} />;
  }

  const loading = loadingVideoUpdate || loadingDelete;

  return (
    <>
      <Title>{t("pages.videos-edit.title")}</Title>
      <Form
        initialValues={video ?? {}}
        name="video-edit"
        onFinish={onVideoEdit}
      >
        <FormItem extra={t("pages.videos-edit.title-hint")} name="title" />
        <FormItem name="description">
          <Input.TextArea />
        </FormItem>
        <FormContent>{VideoPlayer}</FormContent>
        <FormItem name="published" valuePropName="checked">
          <Switch />
        </FormItem>
        <FormContent>
          <Button disabled={loading} onClick={handleDelete}>
            <DeleteOutlined />
            {t("pages.videos-edit.delete")}
          </Button>

          <SubmitButton loading={loading}>
            <EditOutlined />
            {t("pages.videos-edit.submit")}
          </SubmitButton>
        </FormContent>
        {justSaved && (
          <FormContent>
            <Paragraph>
              {t("pages.videos-edit.check-video")}{" "}
              <Link href={`/videos/${videoId}`}>
                {t("pages.videos-edit.here")}
              </Link>
            </Paragraph>
          </FormContent>
        )}
      </Form>
    </>
  );
};

export default EditVideoPage;
