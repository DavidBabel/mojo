import {
  UserAddOutlined,
  UserDeleteOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Badge, Button, Layout } from "antd";
import { signOut } from "next-auth/react";
import React from "react";
import { useTranslation } from "react-i18next";

import { Avatar } from "@/Avatar";
import { ButtonLink } from "@/ButtonLink";
import { LanguageSwitcher } from "@/LanguageSwitcher";
import { useSession } from "~/front/hooks";

const { Header: HeaderAntd } = Layout;

export function Header() {
  const { t } = useTranslation();

  const { isAuthenticated, isAdmin } = useSession();

  return (
    <>
      <HeaderAntd className="site-layout-background">
        {isAdmin() && (
          <div style={{ float: "left", marginLeft: -50, marginTop: -5 }}>
            <Badge.Ribbon color="volcano" text="Admin"></Badge.Ribbon>
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
      </HeaderAntd>
    </>
  );
}
