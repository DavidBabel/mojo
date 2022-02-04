import { gql, useQuery } from "@apollo/client";
import type { NextPage } from "next";

import { LoadingOrError } from "@/LoadingOrError";
import { Query } from "~/@types/generated/graphqlTypes";

const query = gql`
  query Users {
    users {
      id
      name
    }
  }
`;

const GqlDbPage: NextPage = () => {
  const { data: usersData, loading, error } = useQuery<Query>(query);

  if (loading || error) {
    return <LoadingOrError error={error} loading={loading} />;
  }

  const users = usersData?.users;

  return (
    <>
      <p>List of users in database through graphql :</p>

      <div>
        {users?.map(user => (
          <div key={`${user.id}`}>{user.name}</div>
        ))}
      </div>
    </>
  );
};

export default GqlDbPage;
