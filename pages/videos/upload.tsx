import { useMutation } from "@apollo/client";
import type { NextPage } from "next";
import React, { useCallback, useState, type ChangeEvent } from "react";
import { FILE_UPLOAD_MUTATION } from "~/front/gql/mutation/fileUpload.mutation";
import type {
  Mutation,
  MutationVideoUploadArgs,
} from "~/@types/generated/graphqlTypes";
import { LinkNewTab } from "@/LinkNewTab";
import { Switch } from "antd";
import { useToggle } from "~/front/hooks/useToggle.hook";

const UploadVideoPage: NextPage = () => {
  const [uploadedUrl, setUploadedUrl] = useState<string>();
  const [forceBucketUpload, toggleForceBucketUpload] = useToggle(false);
  const [uploadFile] = useMutation<Mutation, MutationVideoUploadArgs>(
    FILE_UPLOAD_MUTATION,
  );

  const handleFileChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const { validity, files } = e.target;
      if (validity.valid && files?.[0]) {
        const file = files[0];
        uploadFile({ variables: { video: file, forceBucketUpload } })
          .then(({ data }) => {
            setUploadedUrl(data?.videoUpload);
          })
          .catch(error => {
            window.alert(error);
          });
      }
    },
    [uploadFile, forceBucketUpload],
  );

  return (
    <>
      <p>
        <LinkNewTab href={"/cat-example.mp4"} download={"cat-example.mp4"}>
          Download a sample video
        </LinkNewTab>
      </p>
      <p>
        <Switch onChange={() => toggleForceBucketUpload()} /> Force upload to
        Cloud Storage
      </p>
      <p>
        <input type="file" onChange={handleFileChange} />
      </p>

      {uploadedUrl && (
        <p>
          <LinkNewTab href={uploadedUrl}>Check your uploaded video</LinkNewTab>
        </p>
      )}
    </>
  );
};

export default UploadVideoPage;
