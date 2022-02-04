// https://react.i18next.com/latest/typescript

import "react-i18next";

import en from "~/front/i18n/translations/en.json";

export type LanguageJSON = typeof en;
export type AvailableLocale = "en" | "fr";

declare module "react-i18next" {
  interface CustomTypeOptions {
    resources: Record<AvailableLocale, LanguageJSON>;
  }
}
