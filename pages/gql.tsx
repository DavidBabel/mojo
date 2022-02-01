import { gql, useQuery } from "@apollo/client";
import type { NextPage } from "next";

import { LoadingOrError } from "@/LoadingOrError";
import { Query } from "~/@types/generated/graphqlTypes";

const GqlDbPage: NextPage = () => {
  const query = gql`
    query Users {
      users {
        id
        name
      }
    }
  `;

  const { data: usersData, loading, error } = useQuery<Query>(query);

  if (loading || error) {
    return <LoadingOrError loading={loading} error={error} />;
  }

  const users = usersData?.users;

  return (
    <>
      <p>List of users in database thru graphql :</p>

      <div>
        {users?.map(user => (
          <div key={`${user.id}`}>{user.name}</div>
        ))}
      </div>
    </>
  );
};

export default GqlDbPage;
