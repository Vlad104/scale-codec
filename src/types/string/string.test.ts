import { StringDecoder } from "./string.decoder";
import { StringEncoder } from "./string.encoder";

describe("String", () => {
  it("Encode", () => {
    // Encode "Hi!"
    expect(new StringEncoder([72n, 105n, 33n]).encode()).toEqual("0x0c486921");
  });

  it("Decode", () => {
    expect(new StringDecoder("0x0c486921").decode()).toStrictEqual([
      72n,
      105n,
      33n,
    ]);
  });
});
