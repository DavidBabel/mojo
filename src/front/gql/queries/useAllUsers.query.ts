import { gql, useQuery } from "@apollo/client";

import { Query } from "~/@types/generated/graphqlTypes";

const USERS_QUERY = gql`
  query UsersQuery {
    users {
      id
      name
      email
      videos {
        id
      }
    }
  }
`;

export function useUsersQuery() {
  return useQuery<Query>(USERS_QUERY, {
    fetchPolicy: "no-cache",
  });
}
