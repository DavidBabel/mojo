import dynamicImport from "next/dynamic";

import type { VideoPlayerProps } from "./part/VideoPlayerNoSSR.component";

/**
 * No SSR dynamic wrapper for VideoPlayerNoSSR
 */
export const VideoPlayer = dynamicImport<VideoPlayerProps>(
  () =>
    import("./part/VideoPlayerNoSSR.component").then(
      mod => mod.VideoPlayerNoSSR,
    ),
  {
    ssr: false,
  },
);
