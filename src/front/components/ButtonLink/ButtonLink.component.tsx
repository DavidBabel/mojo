import { type ButtonProps, Button } from "antd";
import Link from "next/link";
import React from "react";

interface Props extends ButtonProps {
  href: string;
}

export function ButtonLink({ children, href, ...buttonProps }: Props) {
  const external = href.includes("http://") || href.includes("https://");
  return (
    <>
      <Button {...buttonProps}>
        {external ? (
          <a href={href}>{children}</a>
        ) : (
          <Link href={href}>
            <a>{children}</a>
          </Link>
        )}
      </Button>
    </>
  );
}
