import { ScaleEncoder } from "../../scale.encoder";
import { CompactEncoder, Integer } from "../numbers";

export class VectorEncoder extends ScaleEncoder<bigint[]> {
  constructor(
    protected readonly value: bigint[],
    protected readonly coder: new (v: bigint) => Integer
  ) {
    super(value);
  }

  protected forceEncode() {
    const result: number[] = [];
    result.push(new CompactEncoder(BigInt(this.value.length)).getBytes()[0]);

    for (const element of this.value) {
      const encoded = new this.coder(element);
      result.push(...encoded.getBytes());
    }

    return new Uint8Array(result);
  }

  protected validate() {
    if (!Array.isArray(this.value)) {
      throw new Error(`value ${this.value} is not array`);
    }
  }
}
