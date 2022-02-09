import { notification } from "antd";
import { t } from "i18next";

import { extractErrorMessageLocale } from "~/front/lib/errors.helpers";
import { CONFIG } from "~/iso/config";

export const openErrorNotification = (error: Error | string) => {
  const errorMessage = extractErrorMessageLocale(error);
  notification.error({
    description: errorMessage ?? t("notifications.error.default"),
    message: t("notifications.error.message"),
    placement: CONFIG.NOTIFICATION_POSITION,
  });
};
