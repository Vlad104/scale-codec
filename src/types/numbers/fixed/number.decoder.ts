import { ScaleDecoder } from "../../../scale.decoder";
import { createInteger, Integer } from "../integers";

export class NumberDecoder extends ScaleDecoder<Integer> {
  constructor(
    protected readonly value: string,
    protected readonly coder?: new (v: bigint) => Integer
  ) {
    super(value);
  }

  decode() {
    const value = this.value.replace("0x", "");
    const bytes: number[] = [];
    for (let i = 0; i < value.length; i += 2) {
      bytes.push(parseInt(value.slice(i, i + 2), 16));
    }

    let result = 0n;
    for (let i = 0; i < bytes.length; i += 1) {
      result |= BigInt(bytes[i]) << BigInt(i * 8);
    }

    if (this.coder) {
      return new this.coder(result);
    }

    return new (createInteger(result))(result);
  }
}
