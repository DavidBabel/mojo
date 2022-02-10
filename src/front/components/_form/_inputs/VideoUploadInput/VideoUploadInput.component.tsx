import { InboxOutlined, VideoCameraAddOutlined } from "@ant-design/icons";
import { Upload } from "antd";
import type { DraggerProps } from "antd/lib/upload";

import { FormItem } from "@/_form";
import { FormFieldName } from "~/@types/forms";
import { allowedMimeTypes } from "~/iso/constant";

const { Dragger } = Upload;
interface VideoUploadInputProps extends DraggerProps {
  loading?: boolean;
  name?: FormFieldName;
}

export function VideoUploadInput({
  name = "video",
  ...props
}: VideoUploadInputProps) {
  return (
    <>
      <FormItem name={name}>
        <Dragger
          accept={allowedMimeTypes.join(",")}
          customRequest={() => {}}
          iconRender={() => <VideoCameraAddOutlined />}
          maxCount={1}
          multiple={false}
          {...props}
          style={{
            height: 175,
            maxHeight: 175,
            paddingLeft: 50,
            paddingRight: 50,
            ...props.style,
          }}
        >
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">
            Click or drag video file to this area to upload
          </p>
          <p className="ant-upload-hint">Only support for MP4 files</p>
        </Dragger>
      </FormItem>
    </>
  );
}
