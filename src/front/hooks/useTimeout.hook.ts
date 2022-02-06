import { useEffect, useLayoutEffect, useRef } from "react";

export function useTimeout(delay: number, callback: () => void) {
  const savedCallback = useRef(callback);

  useLayoutEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    if (!delay && delay !== 0) {
      return;
    }

    const timeoutId = setTimeout(() => savedCallback.current(), delay);

    return () => clearTimeout(timeoutId);
  }, [delay]);
}
