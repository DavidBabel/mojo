import {
  PlayCircleOutlined,
  SettingOutlined,
  ToolOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Menu as AntMenu } from "antd";
import Link from "next/link";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";

import { LinkNewTab } from "@/LinkNewTab";
import { useKeyPress, useSession } from "~/front/hooks";

const { Item, SubMenu } = AntMenu;

export function Menu() {
  const { t } = useTranslation();
  const { pathname } = useRouter();
  const { isAdmin, isAuthenticated } = useSession();
  const isDevToolsEnabled = useKeyPress({ key: "d", modifier: "ctrlKey" });

  const subPath = pathname.split("/").slice(1);

  return (
    <>
      <AntMenu mode="inline" selectedKeys={subPath} theme="dark">
        {isAuthenticated() ? (
          <>
            <Item icon={<PlayCircleOutlined />} key="videos">
              <Link href="/videos">
                {isAdmin()
                  ? t("layout.menu.videos")
                  : t("layout.menu.my-videos")}
              </Link>
            </Item>
            <Item icon={<SettingOutlined />} key="account">
              <Link href="/account">{t("layout.menu.account")}</Link>
            </Item>
          </>
        ) : (
          <Item icon={<UserOutlined />} key="auth">
            <Link href="/auth">{t("layout.menu.auth")}</Link>
          </Item>
        )}

        {isAdmin() && (
          <Item icon={<UserOutlined />} key="admin">
            <Link href="/admin">{t("layout.menu.manage-users")}</Link>
          </Item>
        )}
        <Item icon={<ToolOutlined />} key="tools">
          <Link href="/tools">{t("layout.menu.demo-tools")}</Link>
        </Item>

        {isDevToolsEnabled && (
          <>
            <SubMenu
              icon={<SettingOutlined />}
              key="quicklinks"
              title="Quick links"
            >
              <Item icon={<SettingOutlined />} key="github">
                <LinkNewTab href="https://github.com/DavidBabel/mojo">
                  Repo
                </LinkNewTab>
              </Item>
              <Item icon={<SettingOutlined />} key="builds">
                <LinkNewTab href="https://github.com/DavidBabel/mojo/actions">
                  CI
                </LinkNewTab>
              </Item>
              <Item icon={<SettingOutlined />} key="run">
                <LinkNewTab href="https://dashboard.heroku.com/pipelines/6041acc2-fe63-4add-a8c3-51a9ce622ca9">
                  CD
                </LinkNewTab>
              </Item>
              <Item icon={<SettingOutlined />} key="notion">
                <Link href="https://www.notion.so/Following-Mojo-Web-3ae7435c8f904b3d81bc5a911913dd1a">
                  Notion
                </Link>
              </Item>
              <Item icon={<SettingOutlined />} key="subject">
                <Link href="https://www.notion.so/archery/Technical-Test-d5033edf044f45aaa8c13adce9076c82">
                  Test Subject
                </Link>
              </Item>
              <Item icon={<SettingOutlined />} key="storage">
                <Link href="https://console.cloud.google.com/storage/browser/mojo-dev">
                  GStorage
                </Link>
              </Item>
              <Item icon={<SettingOutlined />} key="datadog">
                <Link href="https://app.datadoghq.eu/monitors/manage">
                  Datadog
                </Link>
              </Item>
            </SubMenu>
            <SubMenu
              icon={<SettingOutlined />}
              key="envjumper"
              title="Env Jumper"
            >
              <Item icon={<SettingOutlined />} key="local">
                <Link href="http://localhost:4000">Localhost</Link>
              </Item>
              <Item icon={<SettingOutlined />} key="devenv">
                <Link href="https://dashboard.heroku.com/pipelines/6041acc2-fe63-4add-a8c3-51a9ce622ca9">
                  Review apps
                </Link>
              </Item>
              <Item icon={<SettingOutlined />} key="stagingenv">
                <Link href="https://mojo-video-staging.herokuapp.com/">
                  Staging env
                </Link>
              </Item>
              <Item icon={<SettingOutlined />} key="prodenv">
                <Link href="https://mojo-video-prod.herokuapp.com/">
                  Prod env
                </Link>
              </Item>
            </SubMenu>
          </>
        )}
      </AntMenu>
    </>
  );
}
