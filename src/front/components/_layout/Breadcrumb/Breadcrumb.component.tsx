import { Breadcrumb, BreadcrumbProps } from "antd";
import Link from "next/link";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";

import { BreadcrumbKey } from "~/@types/breadcrumb";
import { capitalize } from "~/iso/string";

export function AutoBreadcrumb(props: BreadcrumbProps) {
  const { t, i18n } = useTranslation();
  const { pathname } = useRouter();

  const pathParts = pathname.split("/");
  pathParts.shift();

  if (pathParts[0] === "[...page404]") {
    pathParts[0] = "404";
  }
  if (pathParts.includes("[videoId]")) {
    pathParts[pathParts.indexOf("[videoId]")] = t("layout.breadcrumb.video");
  }

  let currentLink = "/";

  return (
    <>
      <Breadcrumb style={{ margin: "16px 0" }} {...props}>
        <Breadcrumb.Item>
          <Link href={currentLink}>{t("layout.breadcrumb.home")}</Link>
        </Breadcrumb.Item>
        {pathParts.map((pathPart, index) => {
          currentLink += pathPart + "/";
          const i18nKey = `layout.breadcrumb.${
            pathPart as BreadcrumbKey
          }` as const;
          const text = i18n.exists(i18nKey) ? t(i18nKey) : capitalize(pathPart);
          return (
            <Breadcrumb.Item key={`breadcrump-${index}`}>
              <Link href={currentLink}>{text}</Link>
            </Breadcrumb.Item>
          );
        })}
      </Breadcrumb>
    </>
  );
}
