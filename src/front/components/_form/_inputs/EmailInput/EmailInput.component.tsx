import { MailOutlined } from "@ant-design/icons";
import { Input } from "antd";
import { useTranslation } from "react-i18next";

import type { FormItemProps } from "@/_form/FormItem";
import { FormItem } from "@/_form/FormItem";

export interface EmailInputProps extends FormItemProps {
  alreadyTaken?: boolean;
  disabled?: boolean;
}

export function EmailInput({
  alreadyTaken = false,
  disabled = false,
  name = "email",
  ...props
}: EmailInputProps) {
  const { t } = useTranslation();

  const alreadyTakenProps: any = alreadyTaken
    ? {
        extra: t("components.EmailInput.already-taken"),
        validateStatus: "error",
      }
    : {};
  return (
    <>
      <FormItem name={name} {...props} {...alreadyTakenProps}>
        <Input
          disabled={disabled}
          prefix={<MailOutlined className="site-form-item-icon" />}
        />
      </FormItem>
    </>
  );
}
