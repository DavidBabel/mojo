import { Form } from "antd";
import type { PropsWithChildren } from "react";

export function FormContentWrapper({ children }: PropsWithChildren<{}>) {
  const xs = { offset: 0, span: 24 };
  const md = { offset: 6, span: 12 };
  return (
    <>
      <Form.Item wrapperCol={{ md, xs }}>
        <div style={{ display: "flex", gap: 20 }}>{children}</div>
      </Form.Item>
    </>
  );
}
