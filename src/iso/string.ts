export function getExtension(str: string) {
  return str.split(".").pop() ?? "";
}
