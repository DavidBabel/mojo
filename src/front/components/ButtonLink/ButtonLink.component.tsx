import React from "react";

import Link from "next/link";
import { Button, ButtonProps } from "antd";

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
