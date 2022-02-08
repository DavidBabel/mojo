import { Layout } from "antd";
import Head from "next/head";
import { type ReactNode, useCallback } from "react";
import { useTranslation } from "react-i18next";

import { AutoBreadcrumb } from "@/_layout/Breadcrumb";
import { Header } from "@/_layout/Header";
import { Footer } from "~/front/components/_layout/Footer";
import { Logo } from "~/front/components/_layout/Logo";
import { Menu } from "~/front/components/_layout/Menu";
import { useOnMobile, useSession, useToggle } from "~/front/hooks";

const { Content, Sider } = Layout;

interface Props {
  children: ReactNode;
}

export function PageLayout({ children }: Props) {
  const { t } = useTranslation();
  const { isAdmin } = useSession();

  const [collapsed, toggleCollapsed, setCollapsed] = useToggle(false);
  useOnMobile(useCallback(() => setCollapsed(true), [setCollapsed]));

  return (
    <>
      <Head>
        <title>{t("app-name")}</title>
        <link href="/mojo.png" rel="icon" type="image/png" />
      </Head>
      <Layout style={{ minHeight: "100vh" }}>
        <Sider
          collapsed={collapsed}
          collapsible
          onCollapse={toggleCollapsed}
          style={{
            bottom: 0,
            height: "100%",
            left: 0,
            overflow: "auto",
            paddingTop: collapsed && isAdmin() ? 30 : 0,
            position: "fixed",
            top: 0,
            userSelect: "none",
          }}
        >
          <Logo small={collapsed} />
          <Menu />
        </Sider>
        <Layout
          className="site-layout"
          style={{
            marginLeft: collapsed ? 80 : 200,
            transition: "margin ease 0.2s",
          }}
        >
          <Header />
          <Content
            style={{ margin: "0 16px", maxHeight: "85vh", overflow: "auto" }}
          >
            <AutoBreadcrumb />
            <div
              className="site-layout-background"
              style={{ minHeight: 360, padding: 24 }}
            >
              {children}
            </div>
          </Content>
          <Footer />
        </Layout>
      </Layout>
    </>
  );
}
