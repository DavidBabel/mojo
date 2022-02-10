import sha256 from "crypto-js/sha256";

export function encrypt(input: string) {
  return sha256(input).toString();
}
