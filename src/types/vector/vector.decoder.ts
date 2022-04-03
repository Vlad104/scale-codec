import { ScaleDecoder } from "../../scale.decoder";
import { NumberDecoder } from "../numbers";
import { CompactDecoder } from "../numbers/compact/compact.decoder";

export class VectorDecoder extends ScaleDecoder<bigint[]> {
  decode(): bigint[] {
    const result: bigint[] = [];

    const value = this.value.replace("0x", "");
    const size = new CompactDecoder(value.slice(0, 2)).decode();
    const bytesCount = Math.floor((value.length - 1) / Number(size));

    for (let i = 2; i < value.length; i += bytesCount) {
      result.push(this.decodeElement(value.slice(i, i + bytesCount)));
    }

    return result;
  }

  protected decodeElement(str: string) {
    return new NumberDecoder(str).decode().value;
  }
}
