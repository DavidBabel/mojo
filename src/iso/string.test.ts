import { capitalize,getExtension } from "~/iso/string";

describe("string lib", () => {
  describe("getExtension", () => {
    it("should return the correct extension", () => {
      expect(getExtension("test.jpg")).toBe("jpg");
      expect(getExtension("test.example.mp4")).toBe("mp4");
    });
  });
  describe("capitalize", () => {
    it("should return text capitalzed", () => {
      expect(capitalize("abcd")).toBe("Abcd");
      expect(capitalize("ébcd")).toBe("Ébcd");
      expect(capitalize("ABCD")).toBe("ABCD");
      expect(capitalize("1234")).toBe("1234");
      expect(capitalize("")).toBe("");
      expect(capitalize(" ")).toBe(" ");
    });
  });
});
