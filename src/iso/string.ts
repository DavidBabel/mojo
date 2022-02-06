export function getExtension(str: string) {
  return str.split(".").pop() ?? "";
}

export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function truncateWithEllipses(text: string, max: number): string {
  return text.substring(0, max - 1) + (text.length > max ? "…" : "");
}
