import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";

import {
  EmailInput,
  Form,
  FormContentWrapper,
  PasswordInput,
  SubmitButton,
  UserInput,
} from "@/_form";
import { Title } from "@/_layout/Title";
import { ButtonLink } from "@/ButtonLink";
import { GitHubSignIn } from "@/GitHubSignIn";
import { useRegisterNewUserMutation } from "~/front/gql/mutations";
import {
  openErrorNotification,
  openSuccessNotification,
} from "~/front/lib/notifications";

interface FormValues {
  email: string;
  name: string;
  password: string;
}

const RegisterPage: NextPage = () => {
  const { t } = useTranslation();
  const router = useRouter();

  const [registerNewUser, { loadingRegisterNewUser }] =
    useRegisterNewUserMutation();

  const onFinish = (values: FormValues) => {
    registerNewUser(values)
      .then(() => {
        openSuccessNotification(t("pages.register.success"));
        router.push("/auth/success-register?email=" + values.email);
      })
      .catch(openErrorNotification);
  };

  return (
    <>
      <Title>{t("pages.register.title")}</Title>
      <GitHubSignIn mode="register" />

      <Form name="register" onFinish={onFinish}>
        <UserInput />
        <EmailInput />
        <PasswordInput />
        <FormContentWrapper>
          <ButtonLink disabled={loadingRegisterNewUser} href="/auth/signin">
            {t("pages.register.already-have-account")}
          </ButtonLink>
          <SubmitButton loading={loadingRegisterNewUser}>
            {t("pages.register.register-with-credentials")}
          </SubmitButton>
        </FormContentWrapper>
      </Form>
    </>
  );
};

export default RegisterPage;
