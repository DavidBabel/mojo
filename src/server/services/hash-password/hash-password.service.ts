import { CONFIG } from "~/iso/config";
import { encrypt } from "~/iso/crypto";

export function hashPassword(password: string): string {
  return encrypt(password + CONFIG.PASSWORD_SALT);
}

export function checkPassword(password: string, hash: string): boolean {
  return hashPassword(password) === hash;
}
