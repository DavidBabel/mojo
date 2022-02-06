import {
  DeleteOutlined,
  EditOutlined,
  LockOutlined,
  UsergroupAddOutlined,
} from "@ant-design/icons";
import { Popover } from "antd";
import { useTranslation } from "react-i18next";

interface Props {
  action: () => void;
  name: "delete" | "edit" | "lock" | "publish";
}

export function VideoCardAction({ action, name }: Props) {
  const { t } = useTranslation();
  let IconComponent: typeof DeleteOutlined;

  switch (name) {
    case "delete":
      IconComponent = DeleteOutlined;
      break;
    case "edit":
      IconComponent = EditOutlined;
      break;
    case "lock":
      IconComponent = LockOutlined;
      break;
    case "publish":
      IconComponent = UsergroupAddOutlined;
      break;
    default:
      IconComponent = EditOutlined;
  }

  return (
    <Popover
      content={t(`components.VideoCard.action.${name}`)}
      placement="bottom"
    >
      <IconComponent onClick={action} />
    </Popover>
  );
}
