import { CONFIG } from "~/iso/config";
import { bucketPrefix } from "~/iso/constant";

/**
 * Handle generated video from seeds without video file for demo
 * Every video name ending with "- demo" will be replaced
 */
export function getVideoUrlForDemo(id: string, title: Maybe<string>) {
  const videoId = title?.endsWith(" - demo") ? CONFIG.DEMO_VIDEO_ID : id;
  return `${bucketPrefix}${videoId}.mp4`;
}
