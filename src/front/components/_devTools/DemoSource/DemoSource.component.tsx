import { bucketPrefix, localBucketPrefix } from "~/iso/constant";
import { isDev } from "~/iso/env";

interface Props {
  dataSrc: string;
  type: string;
}

/**
 * Allows to handle both upload file to local or GStorage bucket.
 */
export function DemoSource({ dataSrc, type = "video/mp4" }: Props) {
  return isDev() ? (
    <source
      data-src={dataSrc.replace(bucketPrefix, localBucketPrefix)}
      type={type}
    />
  ) : null;
}
