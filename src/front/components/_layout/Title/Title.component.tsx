import { Typography } from "antd";
import { TitleProps } from "antd/lib/typography/Title";

export function Title({ level = 2, ...props }: TitleProps) {
  return (
    <>
      <Typography.Title level={level} {...props} />
    </>
  );
}
