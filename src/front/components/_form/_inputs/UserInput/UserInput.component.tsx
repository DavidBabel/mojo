import { UserOutlined } from "@ant-design/icons";
import { Input } from "antd";

import { FormItem, FormItemProps } from "@/_form/FormItem";

interface UserInputProps extends FormItemProps {
  disabled?: boolean;
}

export function UserInput({
  name = "name",
  disabled = false,
  ...props
}: UserInputProps) {
  return (
    <>
      <FormItem name={name} {...props}>
        <Input
          disabled={disabled}
          prefix={<UserOutlined className="site-form-item-icon" />}
        />
      </FormItem>
    </>
  );
}
