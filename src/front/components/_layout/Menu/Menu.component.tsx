import React from "react";
import { PlayCircleOutlined, SettingOutlined } from "@ant-design/icons";
import { Menu as AntMenu } from "antd";
import Link from "next/link";
import { useRouter } from "next/router";

import { useKeyPress } from "~/front/hooks/useKeyPress.hook";
import { LinkNewTab } from "@/LinkNewTab";

const { Item, SubMenu } = AntMenu;

export function Menu() {
  const { pathname } = useRouter();
  const isDevMode = useKeyPress({ modifier: "ctrlKey", key: "d" });

  const subPath = pathname.split("/").slice(1);

  return (
    <>
      <AntMenu theme="dark" selectedKeys={subPath} mode="inline">
        <Item key="videos" icon={<PlayCircleOutlined />}>
          <Link href="/videos">Videos</Link>
        </Item>
        <Item key="account" icon={<SettingOutlined />}>
          <Link href="/account">Account</Link>
        </Item>
        <Item key="db" icon={<SettingOutlined />}>
          <Link href="/db">Check DB</Link>
        </Item>
        {isDevMode && (
          <>
            <SubMenu
              key="envjumper"
              icon={<SettingOutlined />}
              title="Env Jumper"
            >
              <Item key="local" icon={<SettingOutlined />}>
                <Link href="http://localhost:3000">Local</Link>
              </Item>
              <Item key="devenv" icon={<SettingOutlined />}>
                <Link href="https://mojo-dev-nujin2hbiq-ew.a.run.app/">
                  Dev env
                </Link>
              </Item>
              <Item key="stagingenv" icon={<SettingOutlined />}>
                <Link href="https://mojo-staging-nujin2hbiq-ew.a.run.app/">
                  Staging env
                </Link>
              </Item>
              <Item key="prodenv" icon={<SettingOutlined />}>
                <Link href="https://mojo-prod-nujin2hbiq-ew.a.run.app/">
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
                <LinkNewTab href="https://console.cloud.google.com/cloud-build/builds?project=mojo-339419">
                  Builds
                </LinkNewTab>
              </Item>
              <Item key="run" icon={<SettingOutlined />}>
                <LinkNewTab href="https://console.cloud.google.com/run?project=mojo-339419">
                  Cloud run
                </LinkNewTab>
              </Item>
              <Item key="notion" icon={<SettingOutlined />}>
                <Link href="https://www.notion.so/Following-Mojo-Web-3ae7435c8f904b3d81bc5a911913dd1a">
                  Notion
                </Link>
              </Item>
            </SubMenu>
          </>
        )}
      </AntMenu>
    </>
  );
}
