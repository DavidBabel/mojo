import { ExclamationCircleOutlined } from "@ant-design/icons";
import { Modal } from "antd";
import { t } from "i18next";

const { confirm } = Modal;

export function ifConfirmDeleteModal(onOk: () => void, onCancel: () => void) {
  return confirm({
    cancelText: t("components.VideoCard.modals.confirm-delete.cancelText"),
    content: t("components.VideoCard.modals.confirm-delete.content"),
    icon: <ExclamationCircleOutlined />,
    okText: t("components.VideoCard.modals.confirm-delete.okText"),
    onCancel,
    onOk,
    title: t("components.VideoCard.modals.confirm-delete.title"),
  });
}
