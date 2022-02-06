import {
  Controls,
  DefaultUi,
  MuteControl,
  PlaybackControl,
  Player,
  Video,
} from "@vime/react";

export interface VideoPlayerProps {
  mimetype?: string;
  posterUrl?: string;
  small?: boolean;
  videoUrl: string;
}

export function VideoPlayerNoSSR({
  videoUrl,
  mimetype = "video/mp4",
  posterUrl = undefined,
  small = false,
}: VideoPlayerProps) {
  return (
    <Player theme="dark">
      <Video
        crossOrigin="anonymous"
        poster={posterUrl}
        preload={small ? "none" : "auto"}
      >
        <source data-src={videoUrl} type={mimetype} />
      </Video>

      {small ? (
        <DefaultUi noControls>
          <Controls align="center" justify="center" pin="center">
            <PlaybackControl />
          </Controls>
          <Controls align="end" justify="end" pin="topRight">
            <MuteControl />
          </Controls>
        </DefaultUi>
      ) : (
        <DefaultUi />
      )}
    </Player>
  );
}
