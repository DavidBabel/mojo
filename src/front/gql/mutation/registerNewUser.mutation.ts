import { gql } from "@apollo/client";

export const REGISTER_NEW_USER_MUTATION = gql`
  mutation RegisterNewUserMutation(
    $name: String!
    $password: String!
    $email: String!
  ) {
    registerNewUser(name: $name, password: $password, email: $email)
  }
`;
