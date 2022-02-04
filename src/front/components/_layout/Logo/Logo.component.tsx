import { Typography } from "antd";
import Image from "next/image";
import React from "react";
import { useTranslation } from "react-i18next";

interface Props {
  small: boolean;
}

export function Logo({ small = false }: Props) {
  const { t } = useTranslation();

  return (
    <>
      <div
        className="logo"
        style={{
          alignItems: "center",
          display: "flex",
          gap: 10,
          justifyContent: "center",
          marginLeft: small ? 0 : -20,
          padding: 10,
        }}
      >
        <Image alt="badass logo" height={35} src="/mojo.png" width={35} />

        <Typography
          style={{
            color: "white",
            display: small ? "none" : "block",
            transition: "all ease 0.3s",
          }}
        >
          {t("app-name")}
        </Typography>
      </div>
    </>
  );
}
