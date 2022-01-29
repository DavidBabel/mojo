import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { createUploadLink } from "apollo-upload-client";
import type { AppProps } from "next/app";

import { PageLayout } from "@/_layout/PageLayout";
import { CONFIG } from "~/iso/config";

import { isProd } from "~/iso/env";

import "antd/dist/antd.css";
import "~/front/styles/globals.css";

const uri = isProd()
  ? CONFIG.GRAPHQL_ENDPOINT
  : "http://localhost:3000" + CONFIG.GRAPHQL_ENDPOINT;

const link = createUploadLink({ uri });

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
