import { ApolloError } from "@apollo/client";
import { Button, Spin } from "antd";
import Link from "next/link";
import { useState } from "react";

import { Title } from "@/_layout/Title";

interface Props {
  loading: boolean;
  error?: ApolloError;
}

export function LoadingOrError({ loading, error }: Props) {
  const [showError, setShowError] = useState(false);

  if (loading) {
    return <Spin size="large" />;
  }
  if (error) {
    return (
      <div
        style={{
          padding: 2,
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "calc(100vh - 150px)",
        }}
      >
        <Title>
          An error occured, are you{" "}
          <Link href="/login">
            <a>
              <Button color="primary">logged in</Button>
            </a>
          </Link>{" "}
          ?
        </Title>
        <br />
        <Button color="secondary" onClick={() => setShowError(!showError)}>
          {showError ? "Hide" : "Show"} error
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
