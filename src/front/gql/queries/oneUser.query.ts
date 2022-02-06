import { gql, useQuery } from "@apollo/client";

import { Query, QueryFindFirstUserArgs } from "~/@types/generated/graphqlTypes";
import { whereQueryId } from "~/front/gql/helpers/graphql.helpers";

const ONE_USER_QUERY = gql`
  query FindFirstUser(
    $where: UserWhereInput
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
  return useQuery<Query, QueryFindFirstUserArgs>(
    ONE_USER_QUERY,
    whereQueryId(id),
  );
}
