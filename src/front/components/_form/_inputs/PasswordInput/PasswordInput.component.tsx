import { LockOutlined } from "@ant-design/icons";
import { Input } from "antd";

import { type FormItemProps, FormItem } from "@/_form/FormItem";

export function PasswordInput({ name = "password", ...props }: FormItemProps) {
  return (
    <>
      <FormItem name={name} {...props}>
        <Input.Password
          prefix={<LockOutlined className="site-form-item-icon" />}
        />
      </FormItem>
    </>
  );
}
