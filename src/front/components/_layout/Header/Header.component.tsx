import {
  UserAddOutlined,
  UserDeleteOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button, Layout } from "antd";
import { signOut } from "next-auth/react";
import { useTranslation } from "react-i18next";

import { Ribbon } from "@/_layout/antd.exports";
import { Avatar } from "@/Avatar";
import { ButtonLink } from "@/ButtonLink";
import { LanguageSwitcher } from "@/LanguageSwitcher";
import { useSession } from "~/front/hooks";

const { Header: AntHeader } = Layout;

export function Header() {
  const { t } = useTranslation();

  const { isAuthenticated, isAdmin } = useSession();

  return (
    <>
      <AntHeader className="site-layout-background">
        {isAdmin() && (
          <div style={{ float: "left", marginLeft: -54, marginTop: -5 }}>
            <Ribbon color="volcano" text="Admin"></Ribbon>;
          </div>
        )}
        <div
          style={{
            alignItems: "center",
            display: "flex",
            gap: 10,
            height: "100%",
            justifyContent: "flex-end",
            userSelect: "none",
          }}
        >
          {isAuthenticated() ? (
            <>
              <Button onClick={() => signOut()}>
                <>
                  <UserDeleteOutlined /> {t("layout.header.connexion.sign-out")}
                </>
              </Button>
              <Avatar />
            </>
          ) : (
            <>
              <ButtonLink href="/auth/signin">
                <UserOutlined /> {t("layout.header.connexion.sign-in")}
              </ButtonLink>
              <ButtonLink href="/auth/register">
                <UserAddOutlined /> {t("layout.header.connexion.register")}
              </ButtonLink>
            </>
          )}
          <LanguageSwitcher />
        </div>
      </AntHeader>
    </>
  );
}
