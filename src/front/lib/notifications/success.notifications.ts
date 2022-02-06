import { notification } from "antd";
import { t } from "i18next";

import { CONFIG } from "~/iso/config";

export const openSuccessNotification = (
  successMessage: string | ReturnType<typeof t>,
) => {
  notification.success({
    description: successMessage,
    message: t("notifications.success.message"),
    placement: CONFIG.NOTIFICATION_POSITION,
  });
};
