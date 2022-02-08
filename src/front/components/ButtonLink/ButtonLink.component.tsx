import { type ButtonProps, Button } from "antd";
import Link from "next/link";

interface Props extends ButtonProps {
  download?: string;
  href: string;
}

export function ButtonLink({
  children,
  href,
  download,
  ...buttonProps
}: Props) {
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
