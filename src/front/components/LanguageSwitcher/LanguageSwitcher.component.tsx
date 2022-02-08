import { Popover } from "antd";
import Image from "next/image";
import { useTranslation } from "react-i18next";

import type { AvailableLocale } from "~/@types/react-i18next";

export function LanguageSwitcher() {
  const { i18n, t } = useTranslation();
  const changeLanguageHandler = (lang: AvailableLocale) => {
    i18n.changeLanguage(lang);
  };

  return (
    <>
      <Popover
        content={t("components.LanguageSwitcher.switch-to")}
        placement="left"
      >
        {i18n.language === "en" ? (
          <Image
            alt="Afficher en français"
            height={20}
            onClick={() => changeLanguageHandler("fr")}
            src="/flags/fr.svg"
            width={20}
          />
        ) : (
          <Image
            alt="Switch to english"
            height={20}
            onClick={() => changeLanguageHandler("en")}
            src="/flags/gb.svg"
            width={20}
          />
        )}
      </Popover>
    </>
  );
}
