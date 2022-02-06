import { gql, useMutation } from "@apollo/client";

import {
  Mutation,
  MutationDeleteVideoArgs,
} from "~/@types/generated/graphqlTypes";
import { whereMutationId } from "~/front/gql/helpers/graphql.helpers";

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
    (id: string) => action(whereMutationId(id)),
    { ...options, loadingDeleteVideo: options.loading },
  ] as const;
}
