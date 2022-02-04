import { ApolloError } from "@apollo/client";
import { Button, Row, Spin } from "antd";

import { Title } from "@/_layout/Title";
import { ButtonLink } from "@/ButtonLink";
import { useToggle } from "~/front/hooks";

interface Props {
  error?: ApolloError;
  loading: boolean;
}

export function LoadingOrError({ loading, error }: Props) {
  const [showError, toggleShowError] = useToggle(false);

  if (loading) {
    return (
      <Row align="middle" justify="center" style={{ height: "40vh" }}>
        <Spin size="large" />
      </Row>
    );
  }
  if (error) {
    return (
      <div
        style={{
          alignItems: "center",
          display: "flex",
          flexDirection: "column",
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
            <textarea style={{ height: 400, width: 800 }}>
              {JSON.stringify(error, null, 2)}
            </textarea>
          </div>
        )}
      </div>
    );
  }
  return null;
}
