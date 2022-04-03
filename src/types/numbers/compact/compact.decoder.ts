import { ScaleDecoder } from "../../../scale.decoder";

export class CompactDecoder extends ScaleDecoder<bigint> {
  decode() {
    const value = this.value.replace("0x", "");
    const firstByte = parseInt(value.slice(0, 2), 16);
    const mode = firstByte & 0b11;

    if (mode === 0b00) {
      return BigInt(firstByte >> 2);
    }

    if (mode === 0b01) {
      return this.decodeTwoByte(value.slice(2), firstByte);
    }

    if (mode === 0b10) {
      return this.decodeFourByte(value.slice(2), firstByte);
    }

    if (mode === 0b11) {
      return this.decodeBigInt(value.slice(2));
    }

    throw new Error(`could not recognize compact mode`);
  }

  getBytes(value: string) {
    const bytes: number[] = [];
    for (let i = 0; i < value.length; i += 2) {
      bytes.push(parseInt(value.slice(i, i + 2), 16));
    }

    return bytes;
  }

  private decodeTwoByte(value: string, firstByte: number) {
    let result = 0n;
    const bytes = this.getBytes(value);
    for (let i = 0; i < bytes.length; i++) {
      result |= BigInt(bytes[i]) << (8n * BigInt(i) + 6n);
    }
    result |= BigInt(firstByte >> 2);
    return result;
  }

  private decodeFourByte(value: string, firstByte: number) {
    let result = 0n;
    const bytes = this.getBytes(value);
    for (let i = 0; i < bytes.length; i++) {
      result |= BigInt(bytes[i]) << (8n * BigInt(i) + 6n);
    }
    result |= BigInt(firstByte >> 2);
    return result;
  }

  private decodeBigInt(value: string) {
    let result = 0n;
    const bytes = this.getBytes(value);
    for (let i = 0; i < bytes.length; i++) {
      result |= BigInt(bytes[i]) << (8n * BigInt(i));
    }

    return result;
  }
}
