import { gql, useMutation } from "@apollo/client";

import {
  Mutation,
  MutationVideoCreateArgs,
} from "~/@types/generated/graphqlTypes";
import { videoTitleRequired } from "~/iso/constant";
import { GqlType } from "~/iso/enums";

const titleStringType = videoTitleRequired
  ? GqlType.StringRequired
  : GqlType.String;

const VIDEO_CREATE_MUTATION = gql`
  mutation Mutation(
    $title: ${titleStringType}
    $video: Upload!
    $forceBucketUpload: Boolean
    $description: String
    $published: Boolean!
  ) {
    videoCreate(
      title: $title
      video: $video
      forceBucketUpload: $forceBucketUpload
      description: $description
      published: $published
    )
  }
`;

export function useVideoCreateMutation() {
  const [action, options] = useMutation<Mutation, MutationVideoCreateArgs>(
    VIDEO_CREATE_MUTATION,
  );
  return [
    (datas: MutationVideoCreateArgs) => action({ variables: datas }),
    { ...options, loadingVideoCreate: options.loading },
  ] as const;
}
