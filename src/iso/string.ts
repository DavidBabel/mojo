export function getExtension(str: string) {
  return str.split(".").pop() ?? "";
}

export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
