import { gql, useMutation } from "@apollo/client";

import {
  Mutation,
  MutationUpdateVideoArgs,
} from "~/@types/generated/graphqlTypes";

const VIDEO_PUBLISH_MUTATION = gql`
  mutation DeleteVideo(
    $data: VideoUpdateInput!
    $where: VideoWhereUniqueInput!
  ) {
    updateVideo(data: $data, where: $where) {
      published
    }
  }
`;

export function usePublishVideoMutation() {
  const [action, options] = useMutation<Mutation, MutationUpdateVideoArgs>(
    VIDEO_PUBLISH_MUTATION,
  );
  return [
    (id: string, published: boolean) =>
      action({
        variables: {
          data: {
            published: {
              set: published,
            },
          },
          where: {
            id,
          },
        },
      }),
    { ...options, loadingPublishVideo: options.loading },
  ] as const;
}
