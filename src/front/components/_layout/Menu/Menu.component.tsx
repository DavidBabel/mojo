import React from "react";
import { PlayCircleOutlined, SettingOutlined } from "@ant-design/icons";
import { Menu as AntMenu } from "antd";
import Link from "next/link";
import { useRouter } from "next/router";

import { useKeyPress } from "~/front/hooks/useKeyPress.hook";

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
        {isDevMode && (
          <SubMenu
            key="envjumper"
            icon={<SettingOutlined />}
            title="Env Jumper"
          >
            <Item key="local" icon={<SettingOutlined />}>
              <Link href="http://localhost:3000">Local</Link>
            </Item>
            <Item key="local" icon={<SettingOutlined />}>
              <Link href="https://mojo-dev-nujin2hbiq-ew.a.run.app/">
                Dev env
              </Link>
            </Item>
            <Item key="local" icon={<SettingOutlined />}>
              <Link href="https://mojo-staging-nujin2hbiq-ew.a.run.app/">
                Staging env
              </Link>
            </Item>
            <Item key="local" icon={<SettingOutlined />}>
              <Link href="https://mojo-prod-nujin2hbiq-ew.a.run.app/">
                Prod env
              </Link>
            </Item>
          </SubMenu>
        )}
      </AntMenu>
    </>
  );
}
