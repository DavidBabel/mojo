import { exists, t } from "i18next";

const prefix = "backend-errors";

export function extractErrorMessageLocale(error: Error | string) {
  const errorMessage = typeof error === "string" ? error : error?.message;
  const i18nKey = `${prefix}.${errorMessage}`;
  const i18nKeyExists = exists(i18nKey);
  if (!i18nKeyExists) {
    console.warn("Key not found in translations", i18nKey);
  }
  const finalErrorMessage = i18nKeyExists ? t(i18nKey) : errorMessage;
  return finalErrorMessage;
}
