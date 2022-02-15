/**
 * @jest-environment jsdom
 */
import { act, renderHook } from "@testing-library/react-hooks";

import { useToggle } from "./useToggle.hook";

describe("useToggle.hook", () => {
  it("should toggle boolean correctly", () => {
    const { result } = renderHook(() => useToggle(false));

    let [isActive, toggleActive, setActive] = result.current;
    expect(isActive).toBe(false);
    act(() => {
      toggleActive();
    });
    [isActive, toggleActive, setActive] = result.current;
    expect(isActive).toBe(true);
    act(() => {
      toggleActive();
    });
    [isActive, toggleActive, setActive] = result.current;
    expect(isActive).toBe(false);
    act(() => {
      setActive(true);
    });
    [isActive, toggleActive, setActive] = result.current;
    expect(isActive).toBe(true);
  });
});
