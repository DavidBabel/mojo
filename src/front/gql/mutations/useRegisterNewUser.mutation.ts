import { gql, useMutation } from "@apollo/client";

import {
  Mutation,
  MutationRegisterNewUserArgs,
} from "~/@types/generated/graphqlTypes";
import { nameRequired } from "~/iso/constant";
import { GqlType } from "~/iso/enums";

const nameStringType = nameRequired ? GqlType.StringRequired : GqlType.String;

const REGISTER_NEW_USER_MUTATION = gql`
  mutation RegisterNewUserMutation(
    $name: ${nameStringType}
    $password: String!
    $email: String!
  ) {
    registerNewUser(name: $name, password: $password, email: $email)
  }
`;

export function useRegisterNewUserMutation() {
  const [action, options] = useMutation<Mutation, MutationRegisterNewUserArgs>(
    REGISTER_NEW_USER_MUTATION,
  );
  return [
    (values: MutationRegisterNewUserArgs) => action({ variables: values }),
    { ...options, loadingRegisterNewUser: options.loading },
  ] as const;
}
