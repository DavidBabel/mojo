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
import { useRouter } from "next/router";

import { PrismaCard } from "@/_devTools/PrismaCard";
import { LinkNewTab } from "~/front/components/LinkNewTab";
import { CONFIG } from "~/iso/config";

const { Title } = Typography;

const colProps = {
  span: 24,
  md: { span: 12 },
  xl: { span: 6 },
  style: { minWidth: 180 },
};

const iconStyle = {
  width: "100%",
  lineHeight: "2em",
  fontSize: "4em",
};

const ToolsPage: NextPage = () => {
  const router = useRouter();

  console.log("router :");
  console.log(router);

  return (
    <>
      <Title level={2}>Tools for demo only</Title>
      <Row justify="space-around" gutter={[24, 16]}>
        <Col {...colProps}>
          <Link href="/login?email=admin@admin.io&password=admin" passHref>
            <Card
              hoverable
              cover={
                <div style={{ padding: 20 }}>
                  <SettingOutlined style={iconStyle} />
                </div>
              }
            >
              <Card.Meta
                title="Log as admin"
                description="Quick log as admin (only for demo)"
              />
            </Card>
          </Link>
        </Col>
        <Col {...colProps}>
          <Link href="/login?email=user@user.io&password=user" passHref>
            <Card
              hoverable
              cover={
                <div style={{ padding: 20 }}>
                  <UserOutlined style={iconStyle} />
                </div>
              }
            >
              <Card.Meta
                title="Log as user"
                description="Quick log as user (only for demo)"
              />
            </Card>
          </Link>
        </Col>
        <Col {...colProps}>
          <LinkNewTab href="./cat-example.mp4" download="cat-example.mp4">
            <Card
              hoverable
              cover={
                <div style={{ padding: 20 }}>
                  <VideoCameraOutlined style={iconStyle} />
                </div>
              }
            >
              <Card.Meta
                title="Uploadable video file"
                description="Download a video sample file"
              />
            </Card>
          </LinkNewTab>
        </Col>
        <Col {...colProps}>
          <Link href="/tools/session" passHref>
            <Card
              hoverable
              cover={
                <div style={{ padding: 20 }}>
                  <LoginOutlined style={iconStyle} />
                </div>
              }
            >
              <Card.Meta
                title="Check current Session"
                description="Allows to debug current user Session"
              />
            </Card>
          </Link>
        </Col>
        <PrismaCard {...colProps} />
        <Col {...colProps}>
          <LinkNewTab
            href={`https://studio.apollographql.com/sandbox/explorer?endpoint=http://localhost:3000/${CONFIG.GRAPHQL_ENDPOINT}`}
          >
            <Card
              hoverable
              cover={
                <div style={{ padding: 20 }}>
                  <Image
                    width={400}
                    height={200}
                    alt="apollo studio"
                    src="/tools/apollo.svg"
                  />
                </div>
              }
            >
              <Card.Meta
                title="Launch Apollo studio"
                description="Allows to navigate thru the GraphQL API"
              />
            </Card>
          </LinkNewTab>
        </Col>
        <Col {...colProps}>
          <LinkNewTab href="https://github.com/settings/apps/authorizations">
            <Card
              hoverable
              cover={
                <div style={{ padding: 20 }}>
                  <Image
                    width={400}
                    height={200}
                    alt="Github auth"
                    src="/tools/github.svg"
                  />
                </div>
              }
            >
              <Card.Meta
                title="Check GitHub Authorization"
                description="Allows to disconnect from GitHub App"
              />
            </Card>
          </LinkNewTab>
        </Col>
      </Row>
    </>
  );
};

export default ToolsPage;
