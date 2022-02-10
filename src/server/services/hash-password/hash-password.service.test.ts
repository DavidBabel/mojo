import { CONFIG } from "~/iso/config";
import { encrypt } from "~/iso/crypto";

import { checkPassword, hashPassword } from "./hash-password.service";

describe("HashPasswordService", () => {
  it("should correctly hashPassword", () => {
    expect(hashPassword("toto")).toBe(encrypt("toto" + CONFIG.PASSWORD_SALT));
  });
  it("should correctly checkPassword", () => {
    expect(checkPassword("toto", encrypt("toto" + CONFIG.PASSWORD_SALT))).toBe(
      true,
    );
  });
  it("should checkPassword fail if password does not match", () => {
    expect(checkPassword("toto", encrypt("titi" + CONFIG.PASSWORD_SALT))).toBe(
      false,
    );
  });
});
