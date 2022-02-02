import {
  UserAddOutlined,
  UserDeleteOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Avatar, Button, Layout } from "antd";
import { signOut, useSession } from "next-auth/react";
import React from "react";
import { useTranslation } from "react-i18next";

import { AvatarProps } from "@/Avatar";
import { ButtonLink } from "@/ButtonLink";
import { LanguageSwitcher } from "@/LanguageSwitcher";

const { Header: HeaderAntd } = Layout;

export function Header() {
  const { t } = useTranslation();

  const { data: session, status } = useSession();

  const avatarSrc = session?.user?.image;

  let avatarProps: AvatarProps = { email: session?.user.address };
  if (avatarSrc) {
    avatarProps = { src: avatarSrc };
  }
  return (
    <>
      <HeaderAntd className="site-layout-background">
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            gap: 10,
            height: "100%",
          }}
        >
          {status === "authenticated" ? (
            <>
              <Button onClick={() => signOut()}>
                <>
                  <UserDeleteOutlined /> SignOut
                </>
              </Button>
              <Avatar {...avatarProps} />
            </>
          ) : (
            <>
              <ButtonLink href="/auth/signin">
                <UserOutlined /> {t("layout.header.connexion.sign-in")}
              </ButtonLink>
              <ButtonLink href="/auth/register">
                <UserAddOutlined /> {t("layout.header.connexion.register")}
              </ButtonLink>
              {/* </Button> */}
            </>
          )}
          <LanguageSwitcher />
        </div>
      </HeaderAntd>
    </>
  );
}
