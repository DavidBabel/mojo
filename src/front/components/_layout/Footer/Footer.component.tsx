import React from "react";

import { Layout } from "antd";
import { LinkNewTab } from "@/LinkNewTab";

const { Footer: AntFooter } = Layout;

export function Footer() {
  return (
    <>
      <AntFooter style={{ textAlign: "center" }}>
        By{" "}
        <LinkNewTab href="https://www.linkedin.com/in/david-babel/">
          David Babel
        </LinkNewTab>{" "}
        for <LinkNewTab href="https://www.mojo-app.com/">Mojo</LinkNewTab>
      </AntFooter>
    </>
  );
}
