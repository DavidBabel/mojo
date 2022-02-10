import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Input, Switch } from "antd";
import type { NextPage } from "next";
import Link from "next/link";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import { Form, FormContentWrapper, FormItem, SubmitButton } from "@/_form";
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

  const VideoPlayer = useMemoVideoPlayer(videoId, video?.title!, {
    small: true,
  });

  if (loadingVideoQuery || error) {
    return <LoadingOrError error={error} />;
  }

  const onFinish = async (values: VideoUpdateInput) => {
    if (loadingDelete) return;
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
  };

  const handleDelete = () => {
    if (loadingDelete) return;
    setJustSaved(false);
    setLoadingDelete(true);
    ifConfirmDeleteModal(
      t("pages.videos.modals.confirm-delete"),
      () => {
        deleteVideo(videoId)
          .then(() => openDeletedVideodNotification(String(video?.title)))
          .catch(openErrorNotification)
          .finally(async () => {
            setLoadingDelete(false);
            setTimeout(() => router.push("/videos"), 1500);
          });
      },
      () => setLoadingDelete(false),
    );
  };

  console.log("video :");
  console.log(video);

  return (
    <>
      <Title>{t("pages.videos-edit.title")}</Title>
      <Form initialValues={video ?? {}} name="video-edit" onFinish={onFinish}>
        <FormItem extra={t("pages.videos-edit.title-hint")} name="title" />
        <FormItem name="description">
          <Input.TextArea />
        </FormItem>
        <FormContentWrapper>{VideoPlayer}</FormContentWrapper>
        <FormItem name="published" valuePropName="checked">
          <Switch />
        </FormItem>
        <FormContentWrapper>
          <Button onClick={handleDelete}>
            <DeleteOutlined />
            {t("pages.videos-edit.delete")}
          </Button>

          <SubmitButton loading={loadingVideoUpdate || loadingDelete}>
            <EditOutlined />
            {t("pages.videos-edit.submit")}
          </SubmitButton>
        </FormContentWrapper>
        {justSaved && (
          <FormContentWrapper>
            <Paragraph>
              {t("pages.videos-edit.check-video")}{" "}
              <Link href={`/videos/${videoId}`}>
                {t("pages.videos-edit.here")}
              </Link>
            </Paragraph>
          </FormContentWrapper>
        )}
      </Form>
    </>
  );
};

export default EditVideoPage;
