import { useMutation } from "@apollo/client";
import { Spin, Switch, Typography } from "antd";
import type { NextPage } from "next";
import Link from "next/link";
import React, { type ChangeEvent, useCallback, useState } from "react";

import { LinkNewTab } from "@/LinkNewTab";
import type {
  Mutation,
  MutationVideoUploadArgs,
} from "~/@types/generated/graphqlTypes";
import { VIDEO_UPLOAD_MUTATION } from "~/front/gql/mutations";
import { useToggle } from "~/front/hooks";
import { isDev } from "~/iso/env";

const { Paragraph } = Typography;

const UploadVideoPage: NextPage = () => {
  const [uploadedUrl, setUploadedUrl] = useState<string>();
  const [uploadError, setUploadError] = useState<string>();
  const [uploadLoading, setUploadLoading] = useState(false);
  const [forceBucketUpload, toggleForceBucketUpload] = useToggle(false);
  const [uploadFile] = useMutation<Mutation, MutationVideoUploadArgs>(
    VIDEO_UPLOAD_MUTATION,
  );

  const handleFileChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const { validity, files } = e.target;
      if (validity.valid && files?.[0]) {
        const file = files[0];
        setUploadLoading(true);
        uploadFile({ variables: { forceBucketUpload, video: file } })
          .then(({ data }) => {
            setUploadedUrl(data?.videoUpload);
          })
          .catch(error => {
            setUploadError(error);
          })
          .finally(() => {
            setUploadLoading(false);
          });
      }
    },
    [uploadFile, forceBucketUpload],
  );

  const videoId = uploadedUrl?.split("/").pop()?.replace(".mp4", "");
  let options = "";
  if (!uploadedUrl?.includes("storage.googleapis.com")) {
    options = "?option=local";
  }

  return (
    <>
      <Paragraph>
        <LinkNewTab download={"cat-example.mp4"} href={"/cat-example.mp4"}>
          Download a sample video
        </LinkNewTab>
      </Paragraph>
      {isDev() && (
        <Paragraph>
          <Switch onChange={() => toggleForceBucketUpload()} /> Force upload to
          Cloud Storage
        </Paragraph>
      )}

      <Paragraph>
        <input onChange={handleFileChange} type="file" />{" "}
        {uploadLoading && <Spin size="large" />}
      </Paragraph>

      {uploadError && (
        <Paragraph>
          Something Went Wrong :{" "}
          <pre>
            <code>{JSON.stringify(uploadError, null, 2)}</code>
          </pre>
        </Paragraph>
      )}
      {uploadedUrl && (
        <Paragraph>
          <Link href={`/videos/${videoId}${options}`}>
            Check your uploaded video
          </Link>
        </Paragraph>
      )}
    </>
  );
};

export default UploadVideoPage;
