import { LanguageJSON } from "~/@types/react-i18next";

export type FormName = keyof LanguageJSON["forms"];
export type FormFieldName<T = FormName> = keyof UnionToIntersection<
  LanguageJSON["forms"][T]
>;
