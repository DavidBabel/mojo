import { notification } from "antd";
import { t } from "i18next";

import { CONFIG } from "~/iso/config";

export const openPublishedVideoNotification = (
  videoName: string,
  published: boolean,
) => {
  notification.info({
    description: `
     ${t("pages.videos.notifications.video-published.description", {
       videoName,
     })} ${t(
      `pages.videos.notifications.video-published.${
        published ? "public" : "private"
      }`,
    )}`,
    message: t("pages.videos.notifications.video-published.message"),
    placement: CONFIG.NOTIFICATION_POSITION,
  });
};

export const openDeletedVideodNotification = (videoName: string) => {
  notification.info({
    description: t("pages.videos.notifications.video-deleted.description", {
      videoName,
    }),
    message: t("pages.videos.notifications.video-deleted.message"),
    placement: CONFIG.NOTIFICATION_POSITION,
  });
};
