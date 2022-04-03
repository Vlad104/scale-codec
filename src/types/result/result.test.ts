import { ResultEncoder } from "./result.encoder";
import { Integer, NumberDecoder, NumberEncoder, UInt8 } from "../numbers";
import { BooleanDecoder, BooleanEncoder } from "../boolean";
import { ResultDecoder } from "./result.decoder";

describe("Boolean", () => {
  it("encode", () => {
    expect(
      new ResultEncoder<Integer, boolean>(
        new NumberEncoder(new UInt8(42n))
      ).encode()
    ).toEqual("0x002a");
    expect(
      new ResultEncoder<Integer, boolean>(
        new NumberEncoder(new UInt8(42n)),
        new BooleanEncoder(false)
      ).encode()
    ).toEqual("0x0100");
  });

  it("decode", () => {
    expect(
      (
        new ResultDecoder<Integer, boolean>(
          "0x002a",
          NumberDecoder,
          BooleanDecoder
        ).decode() as Integer
      ).value
    ).toStrictEqual(42n);
    expect(
      new ResultDecoder<Integer, boolean>(
        "0x0100",
        NumberDecoder,
        BooleanDecoder
      ).decode()
    ).toEqual(false);
  });
});
