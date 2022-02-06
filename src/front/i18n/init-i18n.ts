import i18n from "i18next";
// import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

// if you add translations here, you should consider to add it to ./antd-locales.ts too
import enTranslations from "./translations/en.json";
import frTranslations from "./translations/fr.json";

export default i18n
  // .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },

    parseMissingKeyHandler: key => {
      console.warn(`i18n key "${key}" not found.`);
      return key;
    },
    resources: {
      en: { translation: enTranslations },
      fr: { translation: frTranslations },
    },
  });
