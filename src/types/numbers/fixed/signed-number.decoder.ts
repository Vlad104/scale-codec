import { ScaleDecoder } from "../../../scale.decoder";
import { createInteger, Integer } from "../integers";

export class SignedNumberDecoder extends ScaleDecoder<Integer> {
  decode() {
    const value = this.value.replace("0x", "");
    const bytes: number[] = [];
    for (let i = 0; i < value.length; i += 2) {
      bytes.push(parseInt(value.slice(i, i + 2), 16));
    }

    let result = 0n;
    for (let i = 0; i < bytes.length; i += 1) {
      if (i === 0 && bytes[i] > 0x7f) {
        bytes[i] = bytes[i] - 0x100;
      }

      result |= BigInt(bytes[i]) << BigInt(i * 8);
    }

    return new (createInteger(result))(result);
  }
}
