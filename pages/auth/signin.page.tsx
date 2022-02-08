import type { NextPage } from "next";
import { useRouter } from "next/router";
import { signIn, SignInOptions } from "next-auth/react";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import {
  EmailInput,
  Form,
  FormContentWrapper,
  PasswordInput,
  SubmitButton,
} from "@/_form";
import { Title } from "@/_layout/Title";
import { ButtonLink } from "@/ButtonLink";
import { GitHubSignIn } from "@/GitHubSignIn";
import { openErrorNotification } from "~/front/lib/notifications";
import { AuthProviders } from "~/iso/enums";

interface FormValues extends SignInOptions {
  email: string;
  password: string;
}

const SignInPage: NextPage = () => {
  const { query } = useRouter();
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();

  async function handleCredentialsSignIn(values: FormValues) {
    setLoading(true);

    await signIn(AuthProviders.Credentials, values)
      .then(() => {
        console.log(`signIn success`);
      })
      .catch(openErrorNotification)
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <>
      <Title>{t("pages.signin.title")}</Title>
      <GitHubSignIn />
      <Form
        initialValues={query}
        name="signin"
        onFinish={handleCredentialsSignIn}
      >
        <EmailInput />
        <PasswordInput />
        <FormContentWrapper>
          <ButtonLink href="/auth/register">
            {t("pages.signin.dont-have-account")}
          </ButtonLink>
          <SubmitButton loading={loading}>
            {t("pages.signin.signin-with-credentials")}
          </SubmitButton>
        </FormContentWrapper>
      </Form>
    </>
  );
};

export default SignInPage;
