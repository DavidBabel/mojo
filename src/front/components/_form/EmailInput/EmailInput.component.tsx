import { MailOutlined } from "@ant-design/icons";
import { Input } from "antd";

import { type FormItemProps, FormItem } from "@/_form/FormItem";

export function EmailInput({ name = "email", ...props }: FormItemProps) {
  return (
    <>
      <FormItem name={name} {...props}>
        <Input prefix={<MailOutlined className="site-form-item-icon" />} />
      </FormItem>
    </>
  );
}
