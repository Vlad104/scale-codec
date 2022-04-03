import { CompactDecoder } from "./compact.decoder";
import { CompactEncoder } from "./compact.encoder";

describe("Compact", () => {
  it("Encode", () => {
    expect(new CompactEncoder(0n).encode()).toEqual("0x00");
    expect(new CompactEncoder(1n).encode()).toEqual("0x04");
    expect(new CompactEncoder(42n).encode()).toEqual("0xa8");
    expect(new CompactEncoder(69n).encode()).toEqual("0x1501");
    expect(new CompactEncoder(65535n).encode()).toEqual("0xfeff0300");
    expect(new CompactEncoder(100000000000000n).encode()).toEqual(
      "0x0b00407a10f35a"
    );
  });

  it("Decode", () => {
    expect(new CompactDecoder("0x00").decode()).toEqual(0n);
    expect(new CompactDecoder("0x04").decode()).toEqual(1n);
    expect(new CompactDecoder("0xa8").decode()).toEqual(42n);
    expect(new CompactDecoder("0x1501").decode()).toEqual(69n);
    expect(new CompactDecoder("0xfeff0300").decode()).toEqual(65535n);
    expect(new CompactDecoder("0x0b00407a10f35a").decode()).toEqual(
      100000000000000n
    );
  });
});
