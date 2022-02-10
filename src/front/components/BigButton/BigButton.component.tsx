import type { ReactNode } from "react";

import { type ButtonLinkProps, ButtonLink } from "@/ButtonLink";

type Props = Omit<ButtonLinkProps, "href"> & {
  href?: string;
  icon?: ReactNode;
};

export function BigButton({
  icon,
  children,
  href = "#",
  ...buttonProps
}: Props) {
  const style = {
    fontSize: "1.5em",
    height: "5em",
    overflow: "hidden",
    width: "100%",
  };
  return (
    <>
      <ButtonLink {...buttonProps} href={href} style={style}>
        <div style={{ fontSize: "2em" }}>{icon}</div>
        <div>{children}</div>
      </ButtonLink>
    </>
  );
}
