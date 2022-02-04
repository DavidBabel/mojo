import { t } from "i18next";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { signIn, SignInOptions } from "next-auth/react";
import { useState } from "react";

import { EmailInput, Form, PasswordInput, SubmitButton } from "@/_form";
import { Title } from "@/_layout/Title";
import { GitHubSignIn } from "@/GitHubSignIn";
import { AuthProviders } from "~/iso/enums";

interface FormValues extends SignInOptions {
  email: string;
  password: string;
}

const SignInPage: NextPage = () => {
  const { query } = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleCredentialsSignIn(values: FormValues) {
    setLoading(true);

    await signIn(AuthProviders.Credentials, values)
      .then(() => {
        console.log(`signIn success`);
      })
      .catch(error => {
        console.log(`signIn error ${error}`);
      })
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
        <SubmitButton loading={false} type="default">
          {t("pages.signin.signin-with-credentials")}
        </SubmitButton>
      </Form>
    </>
  );
};

export default SignInPage;
