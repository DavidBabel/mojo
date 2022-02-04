import "~/front/i18n/init-i18n";
import "antd/dist/antd.css";
import "~/front/styles/globals.css";

import { ApolloProvider } from "@apollo/client";
import { ConfigProvider } from "antd";
import type { GetServerSideProps } from "next";
import type { AppProps } from "next/app";
import { getSession, SessionProvider } from "next-auth/react";
import { useTranslation } from "react-i18next";

import { PageLayout } from "@/_layout/PageLayout";
import { getCurrentLocale } from "~/front/i18n/antd-locales";
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
  const { i18n } = useTranslation();
  const locale = getCurrentLocale(i18n.language);

  return (
    <SessionProvider session={session}>
      <ApolloProvider client={apolloClient}>
        <ConfigProvider locale={locale}>
          <PageLayout>
            <Component {...pageProps} />
          </PageLayout>
        </ConfigProvider>
      </ApolloProvider>
    </SessionProvider>
  );
}
