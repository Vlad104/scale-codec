import { ScaleEncoder } from "../../../scale.encoder";

export class CompactEncoder extends ScaleEncoder<bigint> {
  get size() {
    if (this.value < 1 << 6) {
      return 1n;
    }

    if (this.value < 1 << 14) {
      return 2n;
    }

    if (this.value < 1 << 22) {
      return 3n;
    }

    return 4n;
  }

  get maxValue() {
    return 1n << 536n;
  }

  get minValue() {
    return 0n;
  }

  protected validate(): void {
    if (typeof this.value !== "bigint") {
      throw new Error(`value ${this.value} is not a number`);
    }
  }

  protected forceEncode() {
    if (this.size === 1n) {
      return this.toSingleByte();
    }

    if (this.size === 2n) {
      return this.toTwoByte();
    }

    if (this.size === 3n) {
      return this.toFourByte();
    }

    return this.toBigInt();
  }

  private toSingleByte() {
    return new Uint8Array([Number(0b00n | (this.getBits(0, 6) << 2n))]);
  }

  private toTwoByte() {
    return new Uint8Array([
      Number(0b01n | (this.getBits(0, 6) << 2n)),
      Number(this.getBits(6, 8)),
    ]);
  }

  private toFourByte() {
    return new Uint8Array([
      Number(0b10n | (this.getBits(0, 6) << 2n)),
      Number(this.getBits(6, 8)),
      Number(this.getBits(14, 8)),
      Number(this.getBits(22, 8)),
    ]);
  }

  private toBigInt() {
    let bytesCount = 0;
    let val = this.value;
    while (val > 0n) {
      bytesCount += 1;
      val = val >> 8n;
    }

    const result = new Uint8Array(bytesCount + 1);
    result[0] = 0b11 | (bytesCount + 4);

    for (let i = 0; i < bytesCount; i++) {
      result[i + 1] = this.getByte(i);
    }

    return result;
  }

  private getByte(index: number) {
    return Number(this.getBits(index * 8, 8));
  }

  private getBits(index: number, count: number) {
    let mask = 0n;
    for (let i = 0; i < count; i++) {
      mask |= 1n << BigInt(i);
    }
    mask = mask << BigInt(index);

    return (this.value & BigInt(mask)) >> BigInt(index);
  }
}
