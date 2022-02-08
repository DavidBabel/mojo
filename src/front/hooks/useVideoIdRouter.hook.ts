import { useRouter } from "next/router";

import { bucketPrefix } from "~/iso/constant";

export function useVideoIdRouter() {
  const router = useRouter();
  const { query } = router;
  const videoId = String(query.videoId);
  const videoUrl = `${bucketPrefix}${query.videoId}.mp4`;

  return { router, videoId, videoUrl };
}
