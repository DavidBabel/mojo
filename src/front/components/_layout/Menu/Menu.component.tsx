import {
  PlayCircleOutlined,
  SettingOutlined,
  ToolOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Menu as AntMenu } from "antd";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { useTranslation } from "react-i18next";

import { LinkNewTab } from "@/LinkNewTab";
import { useKeyPress } from "~/front/hooks/useKeyPress.hook";

const { Item, SubMenu } = AntMenu;

export function Menu() {
  const { t } = useTranslation();
  const { pathname } = useRouter();
  const isDevToolsEnabled = useKeyPress({ modifier: "ctrlKey", key: "d" });

  const subPath = pathname.split("/").slice(1);

  return (
    <>
      <AntMenu theme="dark" selectedKeys={subPath} mode="inline">
        <Item key="videos" icon={<PlayCircleOutlined />}>
          <Link href="/videos">{t("layout.menu.videos")}</Link>
        </Item>
        <Item key="account" icon={<SettingOutlined />}>
          <Link href="/account">{t("layout.menu.account")}</Link>
        </Item>
        <Item key="db" icon={<UserOutlined />}>
          <Link href="/db">DB test</Link>
        </Item>
        <Item key="gql" icon={<UserOutlined />}>
          <Link href="/gql">GQL test</Link>
        </Item>
        <Item key="admin/users" icon={<UserOutlined />}>
          <Link href="/admin/users">{t("layout.menu.manage-users")}</Link>
        </Item>

        <Item key="tools" icon={<ToolOutlined />}>
          <Link href="/tools">{t("layout.menu.demo-tools")}</Link>
        </Item>

        {isDevToolsEnabled && (
          <>
            <SubMenu
              key="envjumper"
              icon={<SettingOutlined />}
              title="Env Jumper"
            >
              <Item key="local" icon={<SettingOutlined />}>
                <Link href="http://localhost:4000">Local</Link>
              </Item>
              <Item key="devenv" icon={<SettingOutlined />}>
                <Link href="https://dashboard.heroku.com/pipelines/6041acc2-fe63-4add-a8c3-51a9ce622ca9">
                  Dev env
                </Link>
              </Item>
              <Item key="stagingenv" icon={<SettingOutlined />}>
                <Link href="https://mojo-video-staging.herokuapp.com/">
                  Staging env
                </Link>
              </Item>
              <Item key="prodenv" icon={<SettingOutlined />}>
                <Link href="https://mojo-video-prod.herokuapp.com/">
                  Prod env
                </Link>
              </Item>
            </SubMenu>
            <SubMenu
              key="quicklinks"
              icon={<SettingOutlined />}
              title="Quick links"
            >
              <Item key="github" icon={<SettingOutlined />}>
                <LinkNewTab href="https://github.com/DavidBabel/mojo">
                  Repo
                </LinkNewTab>
              </Item>
              <Item key="builds" icon={<SettingOutlined />}>
                <LinkNewTab href="https://github.com/DavidBabel/mojo/actions">
                  CI
                </LinkNewTab>
              </Item>
              <Item key="run" icon={<SettingOutlined />}>
                <LinkNewTab href="https://dashboard.heroku.com/pipelines/6041acc2-fe63-4add-a8c3-51a9ce622ca9">
                  CD
                </LinkNewTab>
              </Item>
              <Item key="notion" icon={<SettingOutlined />}>
                <Link href="https://www.notion.so/Following-Mojo-Web-3ae7435c8f904b3d81bc5a911913dd1a">
                  Notion
                </Link>
              </Item>
              <Item key="notion" icon={<SettingOutlined />}>
                <Link href="https://www.notion.so/archery/Technical-Test-d5033edf044f45aaa8c13adce9076c82">
                  Test Subject
                </Link>
              </Item>
            </SubMenu>
          </>
        )}
      </AntMenu>
    </>
  );
}
