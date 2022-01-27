import "~/front/styles/globals.css";
import type { AppProps } from "next/app";
import { PageLayout } from "@/_layout/PageLayout";

import "antd/dist/antd.css";

function MojoApp({ Component, pageProps }: AppProps) {
  return (
    <PageLayout>
      <Component {...pageProps} />
    </PageLayout>
  );
}

export default MojoApp;
