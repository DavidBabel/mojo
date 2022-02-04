import { useMutation } from "@apollo/client";
import type { NextPage } from "next";
import { useTranslation } from "react-i18next";

import {
  EmailInput,
  Form,
  PasswordInput,
  SubmitButton,
  UserInput,
} from "@/_form";
import { Title } from "@/_layout/Title";
import { GitHubSignIn } from "@/GitHubSignIn";
import type {
  Mutation,
  MutationRegisterNewUserArgs,
} from "~/@types/generated/graphqlTypes";
import { REGISTER_NEW_USER_MUTATION } from "~/front/gql/mutations";

const RegisterPage: NextPage = () => {
  const { t } = useTranslation();

  const [registerNewUser, { loading }] = useMutation<
    Mutation,
    MutationRegisterNewUserArgs
  >(REGISTER_NEW_USER_MUTATION);

  const onFinish = (values: any) => {
    registerNewUser({ variables: { ...values } })
      .then(() => console.log("success"))
      .catch(err => console.log(`error ${err}`));
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      <Title>{t("pages.register.title")}</Title>
      <GitHubSignIn mode="register" />

      <Form name="register" onFinish={onFinish} onFinishFailed={onFinishFailed}>
        <UserInput />
        <EmailInput />
        <PasswordInput />
        <SubmitButton loading={loading} />
      </Form>
    </>
  );
};

export default RegisterPage;
