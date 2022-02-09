import { gql, useQuery } from "@apollo/client";

import {
  Query,
  QueryFindFirstUserArgs,
  SortOrder,
  VideoOrderByWithRelationInput,
} from "~/@types/generated/graphqlTypes";

const ONE_USER_QUERY = gql`
  query FindFirstUser(
    $where: UserWhereInput!
    $orderBy: [VideoOrderByWithRelationInput!]
  ) {
    findFirstUser(where: $where) {
      id
      name
      role
      email
      image
      videos(orderBy: $orderBy) {
        id
        createdAt
        updatedAt
        title
        description
        published
      }
    }
  }
`;

export function useOneUserQuery(id?: string) {
  return useQuery<
    Query,
    QueryFindFirstUserArgs & { orderBy?: VideoOrderByWithRelationInput[] }
  >(ONE_USER_QUERY, {
    fetchPolicy: "no-cache",
    skip: !id,
    variables: {
      orderBy: [{ createdAt: SortOrder.Desc }],
      where: { id: { equals: id } },
    },
  });
}
