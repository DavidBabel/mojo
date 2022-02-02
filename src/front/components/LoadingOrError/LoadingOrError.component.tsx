import { ApolloError } from "@apollo/client";
import { Button, Row, Spin } from "antd";

import { Title } from "@/_layout/Title";
import { ButtonLink } from "@/ButtonLink";
import { useToggle } from "~/front/hooks/useToggle.hook";

interface Props {
  loading: boolean;
  error?: ApolloError;
}

export function LoadingOrError({ loading, error }: Props) {
  const [showError, toggleShowError] = useToggle(false);

  if (loading) {
    return (
      <Row justify="center" align="middle" style={{ height: "40vh" }}>
        <Spin size="large" />
      </Row>
    );
  }
  if (error) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Title>
          An error occured, are you{" "}
          <ButtonLink href="/login">logged in</ButtonLink> ?
        </Title>
        <br />
        <Button color="secondary" onClick={toggleShowError}>
          {showError ? "Hide error" : "Show error"}
        </Button>
        {showError && (
          <div>
            <textarea style={{ width: 800, height: 400 }}>
              {JSON.stringify(error, null, 2)}
            </textarea>
          </div>
        )}
      </div>
    );
  }
  return null;
}
