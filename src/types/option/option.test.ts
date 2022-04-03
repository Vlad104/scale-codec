import { OptionDecoder } from "./option.decoder";
import { OptionEncoder } from "./option.encoder";

describe("Option", () => {
  it("encode", () => {
    expect(new OptionEncoder(false).encode()).toEqual("0x02");
    expect(new OptionEncoder(null).encode()).toEqual("0x00");
    expect(new OptionEncoder(1).encode()).toEqual("0x01");
  });

  it("decode", () => {
    expect(new OptionDecoder("0x01").decode()).toEqual(1);
    expect(new OptionDecoder("0x00").decode()).toEqual(null);
    expect(new OptionDecoder("0x02").decode()).toEqual(false);
  });
});
