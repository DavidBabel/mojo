import { SendOutlined } from "@ant-design/icons";
import { Button, Input, Switch } from "antd";
import type { NextPage } from "next";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import { Form, FormContentWrapper, FormItem, SubmitButton } from "@/_form";
import { VideoUploadInput } from "@/_form/_inputs/VideoUploadInput";
import { Title } from "@/_layout/Title";
import { ButtonLink } from "@/ButtonLink";
import { MutationVideoCreateArgs } from "~/@types/generated/graphqlTypes";
import { useVideoCreateMutation } from "~/front/gql/mutations";
import {
  openErrorNotification,
  openSuccessNotification,
} from "~/front/lib/notifications";
import { isDev } from "~/iso/env";

const UploadVideoPage: NextPage = () => {
  const { t } = useTranslation();
  const [createdVideoId, setCreatedVideoId] = useState<Maybe<string>>();
  const [createVideo, { loadingVideoCreate }] = useVideoCreateMutation();

  const onFinish = async (values: MutationVideoCreateArgs) => {
    // fill correct field for gql request
    values.video = values.video?.file?.originFileObj;
    await createVideo(values)
      .then(result => {
        openSuccessNotification(
          t("pages.videos-upload.notifications.upload-success"),
        );
        setCreatedVideoId(result?.data?.videoCreate);
      })
      .catch(openErrorNotification)
      .finally();
  };

  return (
    <>
      <Title>{t("pages.videos-upload.title")}</Title>
      {createdVideoId ? (
        <FormContentWrapper>
          <ButtonLink href={`/videos`}>
            {t("pages.videos-upload.goto-videos")}
          </ButtonLink>
          <ButtonLink href={`/videos/${createdVideoId}`}>
            {t("pages.videos-upload.play-video")}
          </ButtonLink>
          <Button onClick={() => setCreatedVideoId(undefined)}>
            {t("pages.videos-upload.upload-another-one")}
          </Button>
        </FormContentWrapper>
      ) : (
        <Form
          initialValues={{ published: false }}
          name="video-upload"
          onFinish={onFinish}
        >
          <FormItem name="title" />
          <FormItem name="description">
            <Input.TextArea />
          </FormItem>
          <FormContentWrapper>
            <ButtonLink download={"cat-example.mp4"} href={"/cat-example.mp4"}>
              {t("pages.videos.download-example")}
            </ButtonLink>
          </FormContentWrapper>
          <VideoUploadInput />
          <FormItem name="published" valuePropName="checked">
            <Switch />
          </FormItem>
          {isDev() && (
            <FormItem name="forceBucketUpload" valuePropName="checked">
              <Switch />
            </FormItem>
          )}
          <FormContentWrapper>
            <SubmitButton loading={loadingVideoCreate}>
              <SendOutlined />
              {t("pages.videos-upload.submit")}
            </SubmitButton>
          </FormContentWrapper>
        </Form>
      )}
    </>
  );
};

export default UploadVideoPage;
