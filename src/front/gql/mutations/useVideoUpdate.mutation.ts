import { gql, useMutation } from "@apollo/client";

import {
  Mutation,
  MutationUpdateVideoArgs,
  VideoUpdateInput,
} from "~/@types/generated/graphqlTypes";
import { objectToGraphqlSet } from "~/front/gql/helpers/graphql.helpers";

const VIDEO_UPDATE_MUTATION = gql`
  mutation UpdateVideo(
    $data: VideoUpdateInput!
    $where: VideoWhereUniqueInput!
  ) {
    updateVideo(data: $data, where: $where) {
      id
      createdAt
      updatedAt
      title
      description
      published
      authorId
    }
  }
`;

export function useVideoUpdateMutation() {
  const [action, options] = useMutation<Mutation, MutationUpdateVideoArgs>(
    VIDEO_UPDATE_MUTATION,
  );
  return [
    (id: string, data: VideoUpdateInput) =>
      action({ variables: { data: objectToGraphqlSet(data), where: { id } } }),
    { ...options, loadingVideoUpdate: options.loading },
  ] as const;
}
