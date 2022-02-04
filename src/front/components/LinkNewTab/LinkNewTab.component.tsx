import Link, { type LinkProps } from "next/link";
import React from "react";

interface LinkNewTabProps extends React.PropsWithChildren<LinkProps> {
  download?: string;
  href: string;
}

export function LinkNewTab({ children, download, ...props }: LinkNewTabProps) {
  const { href } = props;
  const external = href.includes("http://") || href.includes("https://");
  const preventBlank = href.startsWith("javascript");
  if (external) {
    return (
      <>
        <a
          download={download}
          href={href}
          rel="noreferrer"
          target={preventBlank ? "_self" : "_blank"}
        >
          {children}
        </a>
      </>
    );
  }
  return (
    <>
      <Link {...props} passHref>
        <a
          download={download}
          rel="noreferrer"
          target={preventBlank ? "_self" : "_blank"}
        >
          {children}
        </a>
      </Link>
    </>
  );
}
