export abstract class ScaleEncoder<T> {
  protected bytes?: Uint8Array;
  constructor(protected readonly value: T) {}

  encode() {
    return this.hexPrefix(this.bytesToString(this.getBytes()));
  }

  getBytes() {
    if (!this.bytes) {
      this.validate();
      this.bytes = this.forceEncode();
    }

    return this.bytes;
  }

  protected abstract forceEncode(): Uint8Array;
  protected abstract validate(): void;

  private byteToString(byte: number) {
    const str = byte.toString(16);

    if (str.length > 2) {
      throw new Error(`value ${byte} is not byte`);
    }

    return str.length > 1 ? `${str}` : `0${str}`;
  }

  private bytesToString(bytes: Uint8Array) {
    return Array.from(bytes)
      .map((byte) => this.byteToString(byte))
      .join("");
  }

  private hexPrefix(str: string) {
    return `0x${str}`;
  }
}
