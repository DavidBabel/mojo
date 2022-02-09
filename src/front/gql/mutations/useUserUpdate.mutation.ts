import { gql, useMutation } from "@apollo/client";

import {
  Mutation,
  MutationUpdateUserArgs,
  UserUpdateInput,
} from "~/@types/generated/graphqlTypes";
import { objectToGraphqlSet } from "~/front/gql/helpers/graphql.helpers";

const USER_UPDATE_MUTATION = gql`
  mutation UpdateUser($data: UserUpdateInput!, $where: UserWhereUniqueInput!) {
    updateUser(data: $data, where: $where) {
      id
      name
      email
    }
  }
`;

export function useUserUpdateMutation() {
  const [action, options] = useMutation<Mutation, MutationUpdateUserArgs>(
    USER_UPDATE_MUTATION,
  );
  return [
    (id: string, data: UserUpdateInput) => {
      const { name, password } = data;
      return action({
        variables: {
          data: objectToGraphqlSet({ name, password }),
          where: { id },
        },
      });
    },
    { ...options, loadingUserUpdate: options.loading },
  ] as const;
}
