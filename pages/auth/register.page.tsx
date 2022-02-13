import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";

import {
  EmailInput,
  Form,
  FormContent,
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
  const [alreadyTakenEmail, setAlreadyTakenEmail] = useState(false);

  const [registerNewUser, { loadingRegisterNewUser }] =
    useRegisterNewUserMutation();

  const onRegister = useCallback(
    function handleRegister(values: FormValues) {
      registerNewUser(values)
        .then(() => {
          openSuccessNotification(t("pages.register.success"));
          router.push("/auth/success-register?email=" + values.email);
        })
        .catch(error => {
          openErrorNotification(error);
          if (error.message === "email-already-taken") {
            setAlreadyTakenEmail(true);
          }
        });
    },
    [registerNewUser, router, t],
  );

  return (
    <>
      <Title>{t("pages.register.title")}</Title>
      <GitHubSignIn mode="register" />

      <Form
        name="register"
        onChange={() => setAlreadyTakenEmail(false)}
        onFinish={onRegister}
      >
        <UserInput />
        <EmailInput alreadyTaken={alreadyTakenEmail} />
        <PasswordInput />
        <FormContent>
          <ButtonLink disabled={loadingRegisterNewUser} href="/auth/signin">
            {t("pages.register.already-have-account")}
          </ButtonLink>
          <SubmitButton loading={loadingRegisterNewUser}>
            {t("pages.register.register-with-credentials")}
          </SubmitButton>
        </FormContent>
      </Form>
    </>
  );
};

export default RegisterPage;
