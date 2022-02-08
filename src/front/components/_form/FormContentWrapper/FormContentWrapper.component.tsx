import { type FormItemProps, Form } from "antd";

export function FormContentWrapper({ children }: FormItemProps) {
  const xs = { offset: 0, span: 24 };
  const md = { offset: 6, span: 8 };
  return (
    <>
      <Form.Item wrapperCol={{ md, xs }}>
        <div style={{ display: "flex", gap: 20 }}>{children}</div>
      </Form.Item>
    </>
  );
}
