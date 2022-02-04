import {
  LoginOutlined,
  SettingOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Card, Col, Row, Typography } from "antd";
import type { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";

import { PrismaCard } from "@/_devTools/PrismaCard";
import { LinkNewTab } from "~/front/components/LinkNewTab";
import { useBaseUrl } from "~/front/hooks";
import { CONFIG } from "~/iso/config";

const { Title } = Typography;

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
      <Title level={2}>Tools for demo only</Title>
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
        <Col {...colProps}>
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
                description="Allows to navigate through the GraphQL API"
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
      </Row>
    </>
  );
};

export default ToolsPage;
