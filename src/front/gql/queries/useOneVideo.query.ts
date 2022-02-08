import { gql, useQuery } from "@apollo/client";

import { Query, QueryVideoArgs } from "~/@types/generated/graphqlTypes";

const ONE_VIDEO_QUERY = gql`
  query OneVideoQuery($where: VideoWhereUniqueInput!) {
    video(where: $where) {
      title
      description
      published
    }
  }
`;

export function useOneVideoQuery(id?: string) {
  return useQuery<Query, QueryVideoArgs>(ONE_VIDEO_QUERY, {
    skip: !id,
    variables: {
      where: { id },
    },
  });
}
