import React from "react";
import { Layout } from "antd";

import { Logo } from "@/_layout/Logo";
import { Menu } from "@/_layout/Menu";
import { Footer } from "@/_layout/Footer";
import { AutoBreadcrumb } from "@/_layout/Breadcrumb";

import { useToggle } from "~/front/hooks/useToggle.hook";
import Head from "next/head";

const { Header, Content, Sider } = Layout;

interface Props {
  children: React.ReactNode;
}

export function PageLayout({ children }: Props) {
  const [collapsed, toggleCollapsed] = useToggle(false);

  return (
    <>
      <Head>
        <title>Mojo Web</title>
        <meta name="description" content="A badass app" />
        <link rel="icon" type="image/png" href="/mojo.png" />
      </Head>
      <Layout style={{ minHeight: "100vh" }}>
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={toggleCollapsed}
          style={{
            overflow: "auto",
            height: "100vh",
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
