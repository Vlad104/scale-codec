import { BooleanEncoder } from "./boolean.encoder";
import { BooleanDecoder } from "./boolean.decoder";

describe("Boolean", () => {
  it("encode", () => {
    expect(new BooleanEncoder(true).encode()).toEqual("0x01");
    expect(new BooleanEncoder(false).encode()).toEqual("0x00");
  });

  it("decode", () => {
    expect(new BooleanDecoder("0x01").decode()).toEqual(true);
    expect(new BooleanDecoder("0x00").decode()).toEqual(false);
  });
});
