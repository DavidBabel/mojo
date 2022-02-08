import { gql, useMutation } from "@apollo/client";

import {
  Mutation,
  MutationVideoCreateArgs,
} from "~/@types/generated/graphqlTypes";

const VIDEO_CREATE_MUTATION = gql`
  mutation Mutation(
    $title: String!
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
