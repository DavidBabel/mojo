import { gql, useMutation } from "@apollo/client";

import {
  Mutation,
  MutationRegisterNewUserArgs,
} from "~/@types/generated/graphqlTypes";

const REGISTER_NEW_USER_MUTATION = gql`
  mutation RegisterNewUserMutation(
    $name: String!
    $password: String!
    $email: String!
  ) {
    registerNewUser(name: $name, password: $password, email: $email)
  }
`;

export function useRegisterNewUserMutation<T>() {
  const [action, options] = useMutation<Mutation, MutationRegisterNewUserArgs>(
    REGISTER_NEW_USER_MUTATION,
  );
  return [
    (values: MutationRegisterNewUserArgs) => action({ variables: values }),
    { ...options, loadingRegisterNewUser: options.loading },
  ] as const;
}
