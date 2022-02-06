// eslint-disable-next-line no-restricted-imports
import { t } from "i18next";
import moment, { Moment } from "moment";

export function formatDate(date: Date | Moment | string) {
  return moment(date).format(t("dateFormat.date"));
  t;
}
