// https://react.i18next.com/latest/typescript

import "react-i18next";

import en from "~/front/i18n/locale/en.json";

type Locale = "en" | "fr";

declare module "react-i18next" {
  interface CustomTypeOptions {
    // defaultNS: "translations";
    resources: Record<Locale, typeof en>;
  }
}