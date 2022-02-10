import { ApolloError } from "@apollo/client";
import { Button, Row, Spin } from "antd";
import Link from "next/link";
import { useTranslation } from "react-i18next";

import { Title } from "@/_layout/Title";
import { useToggle } from "~/front/hooks";
import { extractErrorMessageLocale } from "~/front/lib/errors.helpers";

interface Props {
  error?: ApolloError | string;
}

export function LoadingOrError({ error }: Props) {
  const [showErrorDetails, toggleShowErrorDetails] = useToggle(false);
  const { t } = useTranslation();

  if (error) {
    const errorMessage = extractErrorMessageLocale(error);
    return (
      <>
        <Title>
          {t("components.LoadingOrError.title.an-error-occured")}{" "}
          <Link href="/auth/signin">
            {t("components.LoadingOrError.title.logged-in")}
          </Link>{" "}
          ?
        </Title>

        {errorMessage}

        <div style={{ marginTop: 15 }}>
          <Button color="secondary" onClick={toggleShowErrorDetails}>
            {showErrorDetails
              ? t("components.LoadingOrError.hide-error")
              : t("components.LoadingOrError.show-error")}
          </Button>
          {showErrorDetails && (
            <div>
              <textarea
                style={{ height: 400, width: 800 }}
                value={JSON.stringify(error, null, 2)}
              ></textarea>
            </div>
          )}
        </div>
      </>
    );
  } else {
    // loading
    return (
      <Row align="middle" justify="center" style={{ height: "40vh" }}>
        <Spin size="large" />
      </Row>
    );
  }
}
