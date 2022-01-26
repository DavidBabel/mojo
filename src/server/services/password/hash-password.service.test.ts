import { checkPassword, hashPassword } from "./hash-password.service";
import md5 from "md5";
import { CONFIG } from "~/iso/config";

describe("HashPasswordService", () => {
  it("should correctly hashPassword", () => {
    expect(hashPassword("toto")).toBe(md5("toto" + CONFIG.PASSWORD_SALT));
  });
  it("should correctly checkPassword", () => {
    expect(checkPassword("toto", md5("toto" + CONFIG.PASSWORD_SALT))).toBe(
      true,
    );
  });
  it("should checkPassword fail if password does not match", () => {
    expect(checkPassword("toto", md5("titi" + CONFIG.PASSWORD_SALT))).toBe(
      false,
    );
  });
});
