import { useMemo } from "react";

import { VideoPlayer } from "@/VideoPlayer";
import { getVideoUrlForDemo } from "~/front/lib/demo.helpers";

import type { VideoPlayerProps } from "./part/VideoPlayerNoSSR.component";

/**
 *  Allows to use VideoPlayer without SSR and Memoized for performances
 * @param videoId DBiD of the video
 * @param title Title of the video (for demo check)
 * @param props of the VideoPlayer
 * @returns
 */
export function useMemoVideoPlayer(
  videoId: string,
  title?: Maybe<string>,
  props?: Partial<VideoPlayerProps>,
) {
  const videoUrlToUse = getVideoUrlForDemo(videoId, title);
  const videoPlayer = useMemo(
    () => <VideoPlayer {...props} videoUrl={videoUrlToUse} />,
    [videoUrlToUse, props],
  );
  return videoPlayer;
}
