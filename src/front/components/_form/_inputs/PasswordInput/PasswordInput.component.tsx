import { LockOutlined } from "@ant-design/icons";
import { Input } from "antd";

import { type FormItemProps, FormItem } from "@/_form/FormItem";

interface PasswordInputProps extends FormItemProps {
  disabled?: boolean;
  placeholder?: string;
}

export function PasswordInput({
  name = "password",
  disabled = false,
  placeholder,
  ...props
}: PasswordInputProps) {
  return (
    <>
      <FormItem name={name} {...props}>
        <Input.Password
          disabled={disabled}
          placeholder={placeholder}
          prefix={<LockOutlined className="site-form-item-icon" />}
        />
      </FormItem>
    </>
  );
}
