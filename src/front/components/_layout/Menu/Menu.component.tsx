import { PlayCircleOutlined, SettingOutlined } from "@ant-design/icons";
import { Menu as AntMenu } from "antd";
import Link from "next/link";
import { useRouter } from "next/router";

import React from "react";

const { Item } = AntMenu;

export function Menu() {
  const { pathname } = useRouter();
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
        <Item key="playground" icon={<SettingOutlined />}>
          <Link href="/playground/upload">Test upload</Link>
        </Item>
      </AntMenu>
    </>
  );
}
