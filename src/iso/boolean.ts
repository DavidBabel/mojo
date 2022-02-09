/**
 * Allow to make .filter(Truthy) instead of .filter(Boolean) to preserve types
 */
export function Truthy<T>(
  value: T,
): value is Exclude<T, false | null | undefined | "" | 0> {
  return Boolean(value);
}
