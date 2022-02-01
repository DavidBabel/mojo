import { Avatar as AntAvatar } from "antd";
import md5 from "md5";
import Image from "next/image";
import React from "react";

export interface AvatarProps {
  src?: Maybe<string>;
  email?: Maybe<string>;
}

export function Avatar({ src, email }: AvatarProps) {
  let link = "";

  if (src) {
    link = src;
  } else if (email) {
    link = `https://www.gravatar.com/avatar/${md5(email.toLowerCase().trim())}`;
  }

  return (
    <>
      <AntAvatar
        style={{ verticalAlign: "middle", margin: 8 }}
        src={<Image src={link} layout="fill" alt="User avatar" />}
        alt={email?.charAt(0) ?? ""}
      />
    </>
  );
}
