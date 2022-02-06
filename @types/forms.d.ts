import { LanguageJSON } from "~/@types/react-i18next";

export type FormName = keyof LanguageJSON["forms__dynamic"];
export type FormFieldName<T = FormName> = keyof UnionToIntersection<
  LanguageJSON["forms__dynamic"][T]
>;
