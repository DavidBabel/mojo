import { Dispatch, SetStateAction, useState } from "react";

export function useToggle(
  defaultValue: boolean,
): [boolean, () => void, Dispatch<SetStateAction<boolean>>] {
  const [isActive, setActive] = useState<boolean>(defaultValue);
  function toggleActive() {
    setActive(!isActive);
  }

  return [isActive, toggleActive, setActive];
}
