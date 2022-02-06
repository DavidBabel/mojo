import type { NextPage } from "next";
import dynamicImport from "next/dynamic";
import { useRouter } from "next/router";
import React from "react";

import type { VideoPlayerProps } from "~/front/components/VideoPlayerNoSSR";

const VideoPlayer = dynamicImport<VideoPlayerProps>(
  () =>
    import("~/front/components/VideoPlayerNoSSR").then(
      mod => mod.VideoPlayerNoSSR,
    ),
  {
    ssr: false,
  },
);

const PlayVideoPage: NextPage = () => {
  const { query } = useRouter();
  console.log("query :");
  console.log(query);

  const bucketPrefix = `https://storage.googleapis.com/mojo-dev/`;

  let videoUrl = `${bucketPrefix}${query.videoId}.mp4`;
  if (query?.option === "local") {
    videoUrl = `http://localhost:4000/localBucket/${query.videoId}.mp4`;
  }

  console.log("videoUrl :");
  console.log(videoUrl);

  return (
    <>
      <VideoPlayer videoUrl={videoUrl} />
    </>
  );
};

export default PlayVideoPage;
