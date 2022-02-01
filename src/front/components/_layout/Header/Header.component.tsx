import {
  UserAddOutlined,
  UserDeleteOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Avatar, Button, Layout } from "antd";
import { signOut, useSession } from "next-auth/react";
import React from "react";
import { Trans } from "react-i18next";

import { AvatarProps } from "@/Avatar";
import { ButtonLink } from "@/ButtonLink";

const { Header: HeaderAntd } = Layout;

export function Header() {
  const { data: session, status } = useSession();

  const avatarSrc = session?.user?.image;

  let avatarProps: AvatarProps = { email: session?.user.address };
  if (avatarSrc) {
    avatarProps = { src: avatarSrc };
  }
  return (
    <>
      <HeaderAntd
        className="site-layout-background"
        style={{
          padding: 0,
          paddingRight: 40,
          textAlign: "right",
          // gap: 10,
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
              <UserOutlined /> <Trans>layout.header.connexion.sign-in</Trans>
            </ButtonLink>
            <ButtonLink href="/auth/register">
              <UserAddOutlined />{" "}
              <Trans>layout.header.connexion.register</Trans>
            </ButtonLink>
            {/* </Button> */}
          </>
        )}
      </HeaderAntd>
    </>
  );
}
