import { MailOutlined } from "@ant-design/icons";
import { Input } from "antd";

import { type FormItemProps, FormItem } from "@/_form/FormItem";

interface EmailInputProps extends FormItemProps {
  disabled?: boolean;
}

export function EmailInput({
  name = "email",
  disabled = false,
  ...props
}: EmailInputProps) {
  return (
    <>
      <FormItem name={name} {...props}>
        <Input
          disabled={disabled}
          prefix={<MailOutlined className="site-form-item-icon" />}
        />
      </FormItem>
    </>
  );
}
