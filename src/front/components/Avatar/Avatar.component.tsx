import { Avatar as AntAvatar, Popover } from "antd";
import md5 from "md5";
import Image from "next/image";
import React from "react";
import { useTranslation } from "react-i18next";

import { useSession } from "~/front/hooks";
import { AuthProviders } from "~/iso/enums";

export function Avatar() {
  const { t } = useTranslation();
  const {
    user: { email, image, name },
    provider,
  } = useSession();
  let link = "";

  if (image) {
    link = image;
  } else if (email) {
    link = `https://www.gravatar.com/avatar/${md5(
      email.toLowerCase().trim(),
    )}?d=identicon`;
  }

  const popoverLabel =
    provider === AuthProviders.Credentials
      ? "layout.avatar.logged-as"
      : "layout.avatar.logged-with-provider";

  return (
    <>
      <Popover
        content={<>{t(popoverLabel, { name, provider })}</>}
        placement="bottom"
      >
        <AntAvatar
          alt={name}
          src={link && <Image alt="User avatar" layout="fill" src={link} />}
          style={{ backgroundColor: "#fde3cf", color: "#f56a00" }}
        >
          {String(name ?? email)
            .toLocaleUpperCase()
            .charAt(0)}
        </AntAvatar>
      </Popover>
    </>
  );
}
