import { InboxOutlined, VideoCameraAddOutlined } from "@ant-design/icons";
import { Upload } from "antd";
import type { DraggerProps } from "antd/lib/upload";
import { useTranslation } from "react-i18next";

import { FormItem } from "@/_form";
import { FormFieldName } from "~/@types/forms";
import { allowedVideoExtensions } from "~/iso/constant";

const { Dragger } = Upload;
interface VideoUploadInputProps extends DraggerProps {
  loading?: boolean;
  name?: FormFieldName;
}

export function VideoUploadInput({
  name = "video",
  ...props
}: VideoUploadInputProps) {
  const { t } = useTranslation();
  const formats = allowedVideoExtensions.join(",");

  return (
    <>
      <FormItem
        extra={t("components.VideoUploadInput.supported-files", {
          formats,
        })}
        name={name}
      >
        <Dragger
          accept={formats}
          customRequest={() => {}}
          iconRender={() => <VideoCameraAddOutlined />}
          maxCount={1}
          multiple={false}
          {...props}
          style={{
            paddingLeft: 40,
            paddingRight: 40,
            ...props.style,
          }}
        >
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">
            {t("components.VideoUploadInput.drag-and-drop-video")}
          </p>
          <p className="ant-upload-hint"></p>
        </Dragger>
      </FormItem>
    </>
  );
}
