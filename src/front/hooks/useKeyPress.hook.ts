import { useCallback, useEffect } from "react";
import { useToggle } from "~/front/hooks/useToggle.hook";

interface KeyPress {
  key: string;
  modifier: "altKey" | "ctrlKey" | "metaKey" | "shiftKey" | undefined;
}

/* Exposed overloads */
/**
 * Associate a combo key to a boolean starting at pressed: false
 * use !useKeyPress to reverse
 */
export function useKeyPress({ key, modifier }: KeyPress): boolean;
/**
 * Associate a combo key to a callback
 */
export function useKeyPress(
  { key, modifier }: KeyPress,
  callback: () => void,
): boolean;

/** implementation */
export function useKeyPress(
  { key, modifier }: KeyPress,
  callback?: () => void,
): boolean {
  const [pressed, togglePressed] = useToggle(false);

  const handleKeyPress = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === key) {
        if (!modifier || event[modifier] === true) {
          callback?.();
          togglePressed();
        }
      }
    },
    [key, modifier, callback, togglePressed],
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [handleKeyPress]);

  return pressed;
}