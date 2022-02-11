import { CONFIG } from "~/iso/config";

if (CONFIG.FORCE_DATADOG_IN_DEV && !CONFIG.DD_API_KEY) {
  throw new Error(
    `FORCE_DATADOG_IN_DEV is set to "true", but DD_API_KEY is not set`,
  );
}
