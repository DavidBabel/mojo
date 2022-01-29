import React from "react";

import Image from "next/image";
import { Typography } from "antd";

interface Props {
  small: boolean;
}

export function Logo({ small = false }: Props) {
  return (
    <>
      <div
        className="logo"
        style={{
          padding: 10,
          marginLeft: small ? 0 : -20,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 10,
        }}
      >
        <Image src="/mojo.png" alt="badass logo" width={35} height={35} />

        <Typography
          style={{
            color: "white",
            display: small ? "none" : "block",
            transition: "all ease 0.3s",
          }}
        >
          Mojo web
        </Typography>
      </div>
    </>
  );
}
