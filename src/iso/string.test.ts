import { getExtension } from "~/iso/string";

describe("string lib", () => {
  it("should return the correct extension", () => {
    expect(getExtension("test.jpg")).toBe("jpg");
    expect(getExtension("test.example.mp4")).toBe("mp4");
  });
});
