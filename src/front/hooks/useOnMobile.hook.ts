import { useEffect } from "react";

export function useOnMobile(actionCallback: () => void) {
  useEffect(() => {
    if (window?.innerWidth < 768) {
      actionCallback();
    }
  }, [actionCallback]);
}
