import Image from "next/image";
import React from "react";
import { useTranslation } from "react-i18next";

import type { AvailableLocale } from "~/@types/react-i18next";

export function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const changeLanguageHandler = (lang: AvailableLocale) => {
    i18n.changeLanguage(lang);
  };
  return (
    <>
      <Image
        width={20}
        height={20}
        alt="Afficher en français"
        src="/flags/fr.svg"
        onClick={() => changeLanguageHandler("fr")}
      />
      <Image
        width={20}
        height={20}
        alt="Switch to english"
        src="/flags/gb.svg"
        onClick={() => changeLanguageHandler("en")}
      />
    </>
  );
}
