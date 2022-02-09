import { gql, useQuery } from "@apollo/client";

import {
  Query,
  QueryFindFirstVideoArgs,
} from "~/@types/generated/graphqlTypes";

const ONE_VIDEO_QUERY = gql`
  query FindFirstVideo($where: VideoWhereInput!) {
    findFirstVideo(where: $where) {
      title
      description
      published
    }
  }
`;

export function useOneVideoQuery(id?: string) {
  return useQuery<Query, QueryFindFirstVideoArgs>(ONE_VIDEO_QUERY, {
    skip: !id,
    variables: {
      where: { id: { equals: id } },
    },
  });
}
