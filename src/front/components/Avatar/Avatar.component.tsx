import { Avatar as AntAvatar, Popover } from "antd";
import Image from "next/image";
import { useTranslation } from "react-i18next";

import { useSession } from "~/front/hooks";
import { getGravatarLink } from "~/front/lib/gravatar";
import { AuthProviders } from "~/iso/enums";

export function Avatar() {
  const { t } = useTranslation();
  const { user, provider } = useSession();
  const { email, image, name } = user ?? {};
  let link = "";

  if (image) {
    link = image;
  } else if (email) {
    link = getGravatarLink(email);
  }

  const popoverLabel =
    provider === AuthProviders.Credentials
      ? "layout.avatar.logged-as"
      : "layout.avatar.logged-with-provider";

  return (
    <>
      <Popover
        content={<>{t(popoverLabel, { name: name ?? email, provider })}</>}
        placement="bottom"
      >
        <AntAvatar
          alt={name}
          src={link && <Image alt="User avatar" layout="fill" src={link} />}
          style={{ backgroundColor: "lightgrey", color: "#f56a00" }}
        >
          {String(name ?? email)
            .toLocaleUpperCase()
            .charAt(0)}
        </AntAvatar>
      </Popover>
    </>
  );
}
