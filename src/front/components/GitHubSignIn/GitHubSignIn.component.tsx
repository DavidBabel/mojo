import { Button, Form, Spin } from "antd";
import Image from "next/image";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";

import {
  openErrorNotification,
  openSuccessNotification,
} from "~/front/lib/notifications";
import { AuthProviders } from "~/iso/enums";

interface Props {
  mode?: "register" | "signin";
}

export function GitHubSignIn({ mode = "signin" }: Props) {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleGitHubSignIn() {
    if (loading) return;
    setLoading(true);
    await signIn(AuthProviders.Github)
      .then(() => {
        openSuccessNotification(
          t(`components.GitHubSignIn.notification.${mode}`),
        );
        router.push("/auth/signin");
      })
      .catch(openErrorNotification)
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <>
      <Form.Item wrapperCol={{ offset: 6, span: 12 }}>
        <Button
          disabled={loading}
          onClick={handleGitHubSignIn}
          size="large"
          style={{ height: "5em", width: "16em" }}
        >
          <div>
            <Image
              alt="github logo"
              height={40}
              src="/tools/github.svg"
              width={40}
            />
          </div>
          {t(`components.GitHubSignIn.description.${mode}`)}
        </Button>
        {loading && <Spin size="large" style={{ marginLeft: 12 }} />}
      </Form.Item>
    </>
  );
}
