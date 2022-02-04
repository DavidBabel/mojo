import { DefaultUi, Player, Video } from "@vime/react";

export interface VideoPlayerProps {
  mimetype?: string;
  posterUrl?: string;
  videoUrl: string;
}

export function VideoPlayerNoSSR({
  videoUrl,
  mimetype = "video/mp4",
  posterUrl = undefined,
}: VideoPlayerProps) {
  return (
    <Player theme="dark">
      <Video crossOrigin="anonymous" poster={posterUrl} preload="auto">
        <source data-src={videoUrl} type={mimetype} />
      </Video>

      <DefaultUi />
    </Player>
  );
}
