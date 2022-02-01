import { type ButtonProps, Button } from "antd";
import React from "react";

export function SubmitButton({
  children = "Submit",
  ...buttonProps
}: ButtonProps) {
  return (
    <>
      <Button type="primary" htmlType="submit" {...buttonProps}>
        {children}
      </Button>
    </>
  );
}
