import "~/front/i18n/init-i18n";
import "antd/dist/antd.css";
import "~/front/styles/globals.css";

import { ApolloProvider } from "@apollo/client";
import type { GetServerSideProps } from "next";
import type { AppProps } from "next/app";
import { getSession, SessionProvider } from "next-auth/react";

import { PageLayout } from "@/_layout/PageLayout";
import { apolloClient } from "~/front/lib/apollo.init";

export const getServerSideProps: GetServerSideProps = async ctx => {
  return {
    props: {
      session: await getSession(ctx),
    },
  };
};

export default function MojoApp({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <SessionProvider session={session}>
      <ApolloProvider client={apolloClient}>
        <PageLayout>
          <Component {...pageProps} />
        </PageLayout>
      </ApolloProvider>
    </SessionProvider>
  );
}
