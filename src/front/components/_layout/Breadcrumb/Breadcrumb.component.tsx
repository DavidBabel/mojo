import { Breadcrumb, BreadcrumbProps } from "antd";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

import { capitalize } from "~/iso/string";

export function AutoBreadcrumb(props: BreadcrumbProps) {
  const { pathname } = useRouter();

  const pathParts = pathname.split("/");
  pathParts.shift();

  if (pathParts[0] === "[...page404]") {
    pathParts[0] = "404";
  }

  let currentLink = "/";

  return (
    <>
      <Breadcrumb style={{ margin: "16px 0" }} {...props}>
        <Breadcrumb.Item>
          <Link href={currentLink}>Home</Link>
        </Breadcrumb.Item>
        {pathParts.map((pathPart, index) => {
          currentLink += pathPart + "/";
          return (
            <Breadcrumb.Item key={`breadcrump-${index}`}>
              <Link href={currentLink}>{capitalize(pathPart)}</Link>
            </Breadcrumb.Item>
          );
        })}
      </Breadcrumb>
    </>
  );
}
