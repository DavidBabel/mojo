import {
  LoginOutlined,
  SettingOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Card, Col, Row } from "antd";
import type { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";

import { PrismaCard } from "@/_devTools/PrismaCard";
import { Title } from "@/_layout/Title";
import { LinkNewTab } from "~/front/components/LinkNewTab";
import { useBaseUrl } from "~/front/hooks";
import { CONFIG } from "~/iso/config";
import { isDev } from "~/iso/env";

const colProps = {
  md: { span: 12 },
  span: 24,
  style: { minWidth: 180 },
  xl: { span: 6 },
};

const iconStyle = {
  fontSize: "4em",
  lineHeight: "2em",
  width: "100%",
};

const ToolsPage: NextPage = () => {
  const serverBaseUrl = useBaseUrl().replace("4000", "3000");

  return (
    <>
      <Title>Tools for demo only</Title>
      <Row gutter={[24, 16]} justify="space-around">
        <Col {...colProps}>
          <Link
            href="/auth/signin?email=admin@admin.io&password=admin"
            passHref
          >
            <Card
              cover={
                <div style={{ padding: 20 }}>
                  <SettingOutlined style={iconStyle} />
                </div>
              }
              hoverable
            >
              <Card.Meta
                description="Quick log as admin (only for demo)"
                title="Log as admin"
              />
            </Card>
          </Link>
        </Col>
        <Col {...colProps}>
          <Link href="/auth/signin?email=user@user.io&password=user" passHref>
            <Card
              cover={
                <div style={{ padding: 20 }}>
                  <UserOutlined style={iconStyle} />
                </div>
              }
              hoverable
            >
              <Card.Meta
                description="Quick log as user (only for demo)"
                title="Log as user"
              />
            </Card>
          </Link>
        </Col>
        <Col {...colProps}>
          <LinkNewTab download="cat-example.mp4" href="/cat-example.mp4">
            <Card
              cover={
                <div style={{ padding: 20 }}>
                  <VideoCameraOutlined style={iconStyle} />
                </div>
              }
              hoverable
            >
              <Card.Meta
                description="Download a video sample file"
                title="Uploadable video file"
              />
            </Card>
          </LinkNewTab>
        </Col>
        <Col {...colProps}>
          <Link href="/tools/session" passHref>
            <Card
              cover={
                <div style={{ padding: 20 }}>
                  <LoginOutlined style={iconStyle} />
                </div>
              }
              hoverable
            >
              <Card.Meta
                description="Allows to debug current user Session"
                title="Check current Session"
              />
            </Card>
          </Link>
        </Col>
        <PrismaCard {...colProps} />
        <Col {...colProps} style={{ opacity: isDev() ? 1 : 0.35 }}>
          <LinkNewTab
            href={`https://studio.apollographql.com/sandbox/explorer?endpoint=${serverBaseUrl}${CONFIG.GRAPHQL_ENDPOINT}`}
          >
            <Card
              cover={
                <div style={{ padding: 20 }}>
                  <Image
                    alt="apollo studio"
                    height={200}
                    src="/tools/apollo.svg"
                    width={400}
                  />
                </div>
              }
              hoverable
            >
              <Card.Meta
                description="Allows to navigate through the GraphQL API (local only)"
                title="Launch Apollo studio"
              />
            </Card>
          </LinkNewTab>
        </Col>
        <Col {...colProps}>
          <LinkNewTab href="https://github.com/settings/apps/authorizations">
            <Card
              cover={
                <div style={{ padding: 20 }}>
                  <Image
                    alt="Github auth"
                    height={200}
                    src="/tools/github.svg"
                    width={400}
                  />
                </div>
              }
              hoverable
            >
              <Card.Meta
                description="Allows to disconnect from GitHub App"
                title="Check GitHub Authorization"
              />
            </Card>
          </LinkNewTab>
        </Col>
        <Col {...colProps}>
          <LinkNewTab href="https://app.datadoghq.eu/logs">
            <Card
              cover={
                <div style={{ padding: 20 }}>
                  <Image
                    alt="Datadog"
                    height={200}
                    src="/tools/datadog.svg"
                    width={400}
                  />
                </div>
              }
              hoverable
            >
              <Card.Meta
                description="Consult the app Datadog logs"
                title="Check Datadog logs"
              />
            </Card>
          </LinkNewTab>
        </Col>
      </Row>
    </>
  );
};

export default ToolsPage;
