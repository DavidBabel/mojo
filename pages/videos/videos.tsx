import { PlusCircleOutlined } from "@ant-design/icons";
import type { NextPage } from "next";

import { ButtonLink } from "@/ButtonLink";
import { LinkNewTab } from "@/LinkNewTab";

const VideosPage: NextPage = () => {
  return (
    <>
      <p>
        <LinkNewTab href={"/cat-example.mp4"} download={"cat-example.mp4"}>
          Download a sample video
        </LinkNewTab>
      </p>

      <p>
        <ButtonLink href={"/videos/upload"}>
          <PlusCircleOutlined /> Upload new video
        </ButtonLink>
      </p>
    </>
  );
};

export default VideosPage;
