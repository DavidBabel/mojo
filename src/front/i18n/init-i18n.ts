import i18n from "i18next";
// import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

import enLocale from "~/front/i18n/locale/en.json";

export default i18n
  // .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: { en: { translation: enLocale } },
    fallbackLng: "en",

    interpolation: {
      escapeValue: false,
    },
  });
