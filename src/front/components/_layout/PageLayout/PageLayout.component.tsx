import { Layout } from "antd";
import Head from "next/head";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";

import { AutoBreadcrumb } from "@/_layout/Breadcrumb";
import { Header } from "@/_layout/Header";
import { Footer } from "~/front/components/_layout/Footer";
import { Logo } from "~/front/components/_layout/Logo";
import { Menu } from "~/front/components/_layout/Menu";
import { useToggle } from "~/front/hooks/useToggle.hook";

const { Content, Sider } = Layout;

interface Props {
  children: React.ReactNode;
}

export function PageLayout({ children }: Props) {
  const { t } = useTranslation();
  const [collapsed, toggleCollapsed, setCollapsed] = useToggle(false);

  useEffect(() => {
    if (window?.innerWidth < 768) {
      setCollapsed(true);
    }
  }, [setCollapsed]);

  return (
    <>
      <Head>
        <title>{t("app-name")}</title>
        <link rel="icon" type="image/png" href="/mojo.png" />
      </Head>
      <Layout style={{ minHeight: "100vh" }}>
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={toggleCollapsed}
          style={{
            overflow: "auto",
            height: "100%",
            position: "fixed",
            left: 0,
            top: 0,
            bottom: 0,
          }}
        >
          <Logo small={collapsed} />
          <Menu />
        </Sider>
        <Layout
          className="site-layout"
          style={{
            transition: "margin ease 0.2s",
            marginLeft: collapsed ? 80 : 200,
          }}
        >
          <Header />
          <Content style={{ margin: "0 16px" }}>
            <AutoBreadcrumb />
            <div
              className="site-layout-background"
              style={{ padding: 24, minHeight: 360 }}
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
