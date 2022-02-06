import { Form } from "antd";
import type { PropsWithChildren } from "react";

export function FormContentWrapper({ children }: PropsWithChildren<{}>) {
  return (
    <>
      <Form.Item wrapperCol={{ offset: 6, span: 12 }}>
        <div style={{ display: "flex", gap: 10 }}>{children}</div>
      </Form.Item>
    </>
  );
}
