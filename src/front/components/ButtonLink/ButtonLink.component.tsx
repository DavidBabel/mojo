import { type ButtonProps, Button } from "antd";
import Link from "next/link";
import React from "react";

interface Props extends ButtonProps {
  href: string;
}

export function ButtonLink({ children, href, ...buttonProps }: Props) {
  return (
    <>
      <Button {...buttonProps}>
        <Link href={href}>
          <a>{children}</a>
        </Link>
      </Button>
    </>
  );
}
