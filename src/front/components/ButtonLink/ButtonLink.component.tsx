import { Button, ButtonProps } from "antd";
import Link from "next/link";

export interface ButtonLinkProps extends ButtonProps {
  download?: string;
  href: string;
}

export function ButtonLink({
  children,
  href,
  download,
  ...buttonProps
}: ButtonLinkProps) {
  const external = href.startsWith("http://") || href.startsWith("https://");
  const aProps = {
    children,
    download,
    rel: "noreferrer",
    target: download ? "_blank" : "_self",
  };
  return (
    <>
      <Button {...buttonProps}>
        {external ? (
          <a {...aProps} href={href} />
        ) : (
          <Link href={href}>
            <a {...aProps} />
          </Link>
        )}
      </Button>
    </>
  );
}
