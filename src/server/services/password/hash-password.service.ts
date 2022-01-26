import md5 from "md5";
import { CONFIG } from "~/iso/config";

export function hashPassword(password: string): string {
  return md5(password + CONFIG.PASSWORD_SALT);
}

export function checkPassword(password: string, hash: string): boolean {
  return hashPassword(password) === hash;
}
