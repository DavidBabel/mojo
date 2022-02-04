import { PlusCircleOutlined } from "@ant-design/icons";
import type { NextPage } from "next";

import { ButtonLink } from "@/ButtonLink";
import { LinkNewTab } from "@/LinkNewTab";

const VideosPage: NextPage = () => {
  return (
    <>
      <p>
        <LinkNewTab download={"cat-example.mp4"} href={"/cat-example.mp4"}>
          Download a sample video
        </LinkNewTab>
      </p>

      <p>
        <ButtonLink href={"/videos/upload"}>
          <PlusCircleOutlined /> Upload new video
        </ButtonLink>
      </p>

      <p>More to come ... (click above button to upload video)</p>
    </>
  );
};

export default VideosPage;
