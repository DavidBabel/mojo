import { Layout } from "antd";
import { useTranslation } from "react-i18next";

import { LinkNewTab } from "@/LinkNewTab";

const { Footer: AntFooter } = Layout;

export function Footer() {
  const { t } = useTranslation();

  return (
    <>
      <AntFooter style={{ textAlign: "center" }}>
        {t("layout.footer.credit.by")}{" "}
        <LinkNewTab href="https://www.linkedin.com/in/david-babel/">
          David Babel
        </LinkNewTab>{" "}
        {t("layout.footer.credit.for")}{" "}
        <LinkNewTab href="https://www.mojo-app.com/">Mojo</LinkNewTab>
      </AntFooter>
    </>
  );
}
