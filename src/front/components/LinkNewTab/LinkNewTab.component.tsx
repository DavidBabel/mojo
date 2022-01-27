import React from "react";

import Link from "next/link";
import type { LinkProps } from "next/link";

export function LinkNewTab({
  children,
  ...props
}: React.PropsWithChildren<LinkProps>) {
  const preventBlank = props.href.toString().startsWith("javascript");
  return (
    <>
      <Link passHref {...props}>
        <a target={preventBlank ? "_self" : "_blank"} rel="noreferrer">
          {children}
        </a>
      </Link>
    </>
  );
}
