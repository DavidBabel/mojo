import { type ButtonProps as AntButtonProps, Button, Spin } from "antd";
import { useTranslation } from "react-i18next";

interface ButtonProps extends AntButtonProps {
  loading?: boolean;
}

export function SubmitButton({
  children,
  loading,
  ...buttonProps
}: ButtonProps) {
  const { t } = useTranslation();
  if (!children) {
    children = t("common.submit");
  }
  return (
    <>
      <Button
        htmlType="submit"
        type="primary"
        {...buttonProps}
        disabled={loading || buttonProps.disabled}
      >
        {children}
      </Button>

      {loading && <Spin style={{ marginLeft: 12 }} />}
    </>
  );
}
