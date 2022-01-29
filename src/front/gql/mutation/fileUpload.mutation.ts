import { gql } from "@apollo/client";

export const FILE_UPLOAD_MUTATION = gql`
  mutation UploadVideoMutation($video: Upload!, $forceBucketUpload: Boolean) {
    videoUpload(video: $video, forceBucketUpload: $forceBucketUpload)
  }
`;
