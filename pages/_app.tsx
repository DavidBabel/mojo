import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { createUploadLink } from "apollo-upload-client";
import type { AppProps } from "next/app";

import { PageLayout } from "@/_layout/PageLayout";
import { CONFIG } from "~/iso/config";

import "~/front/styles/globals.css";
import "antd/dist/antd.css";

const link = createUploadLink({
  uri: CONFIG.GRAPHQL_ENDPOINT,
});

const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});

function MojoApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <PageLayout>
        <Component {...pageProps} />
      </PageLayout>
    </ApolloProvider>
  );
}

export default MojoApp;
