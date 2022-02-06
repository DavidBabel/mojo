import { UserOutlined } from "@ant-design/icons";
import { Input } from "antd";

import { type FormItemProps, FormItem } from "@/_form/FormItem";

export function UserInput({ name = "name", ...props }: FormItemProps) {
  return (
    <>
      <FormItem name={name} {...props}>
        <Input prefix={<UserOutlined className="site-form-item-icon" />} />
      </FormItem>
    </>
  );
}
