import { UInt16 } from "../numbers";
import { VectorDecoder } from "./vector.decoder";
import { VectorEncoder } from "./vector.encoder";

describe("Compact", () => {
  it("Encode", () => {
    expect(
      new VectorEncoder([4n, 8n, 15n, 16n, 23n, 42n], UInt16).encode()
    ).toEqual("0x18040008000f00100017002a00");
  });

  it("Decode", () => {
    expect(
      new VectorDecoder("0x18040008000f00100017002a00").decode()
    ).toStrictEqual([4n, 8n, 15n, 16n, 23n, 42n]);
  });
});
