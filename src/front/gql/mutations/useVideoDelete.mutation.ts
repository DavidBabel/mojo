import { gql, useMutation } from "@apollo/client";

import {
  Mutation,
  MutationDeleteVideoArgs,
} from "~/@types/generated/graphqlTypes";

const VIDEO_DELETE_MUTATION = gql`
  mutation DeleteVideo($where: VideoWhereUniqueInput!) {
    deleteVideo(where: $where) {
      id
    }
  }
`;

export function useDeleteVideoMutation() {
  const [action, options] = useMutation<Mutation, MutationDeleteVideoArgs>(
    VIDEO_DELETE_MUTATION,
  );
  return [
    (id: string) =>
      action({
        variables: { where: { id } },
      }),
    { ...options, loadingDeleteVideo: options.loading },
  ] as const;
}
