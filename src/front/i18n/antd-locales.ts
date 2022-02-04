import EN from "antd/lib/locale/en_GB";
import FR from "antd/lib/locale/fr_FR";
import { Locale } from "antd/lib/locale-provider";

import { AvailableLocale } from "~/@types/react-i18next";

export const locales: Record<AvailableLocale, Locale> = {
  en: EN,
  fr: FR,
};

export function getCurrentLocale(i18nLanguage: string) {
  if (locales[i18nLanguage as AvailableLocale]) {
    return locales[i18nLanguage as AvailableLocale];
  } else {
    return locales.en;
  }
}
