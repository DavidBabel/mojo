import { Layout } from "antd";
import React from "react";
import { Trans } from "react-i18next";

import { LinkNewTab } from "@/LinkNewTab";

const { Footer: AntFooter } = Layout;

export function Footer() {
  return (
    <>
      <AntFooter style={{ textAlign: "center" }}>
        <Trans>layout.footer.credit.by</Trans>{" "}
        <LinkNewTab href="https://www.linkedin.com/in/david-babel/">
          David Babel
        </LinkNewTab>{" "}
        <Trans>layout.footer.credit.for</Trans>{" "}
        <LinkNewTab href="https://www.mojo-app.com/">Mojo</LinkNewTab>
      </AntFooter>
    </>
  );
}
