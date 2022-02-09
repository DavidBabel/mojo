import { useEffect, useState } from "react";

/**
 * exec a callback or return a isMobile boolean
 */
export function useOnMobile(actionCallback?: () => void) {
  const [isMobile, setMobile] = useState(false);
  useEffect(() => {
    if (window?.innerWidth < 768) {
      actionCallback?.();
    }
    setMobile(window?.innerWidth < 768);
  }, [actionCallback]);
  return isMobile;
}
