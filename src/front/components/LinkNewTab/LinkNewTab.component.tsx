import Link, { type LinkProps } from "next/link";
import React from "react";

interface LinkNewTabProps extends React.PropsWithChildren<LinkProps> {
  download?: string;
}

export function LinkNewTab({ children, download, ...props }: LinkNewTabProps) {
  const preventBlank = props.href.toString().startsWith("javascript");
  return (
    <>
      <Link passHref {...props}>
        <a
          target={preventBlank ? "_self" : "_blank"}
          rel="noreferrer"
          download={download}
        >
          {children}
        </a>
      </Link>
    </>
  );
}
