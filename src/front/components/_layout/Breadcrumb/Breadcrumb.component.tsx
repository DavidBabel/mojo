import React from "react";

import { Breadcrumb, BreadcrumbProps } from "antd";
import Link from "next/link";

export function AutoBreadcrumb(props: BreadcrumbProps) {
  // TODO: try to generate from useRouter
  return (
    <>
      <Breadcrumb style={{ margin: "16px 0" }} {...props}>
        <Breadcrumb.Item>
          <Link href="/">Home</Link>
        </Breadcrumb.Item>
      </Breadcrumb>
    </>
  );
}
