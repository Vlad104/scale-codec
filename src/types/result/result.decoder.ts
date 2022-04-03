import { ScaleDecoder } from "../../scale.decoder";

export class ResultDecoder<T, K> extends ScaleDecoder<T | K> {
  constructor(
    protected readonly value: string,
    protected readonly okValue: new (v: string) => ScaleDecoder<T>,
    protected readonly errValue: new (v: string) => ScaleDecoder<K>
  ) {
    super(value);
  }

  decode() {
    const value = this.value.replace("0x", "");
    const status = parseInt(value.slice(0, 2), 16);

    if (status === 0x00) {
      return new this.okValue(value.slice(2)).decode();
    }

    return new this.errValue(value.slice(2)).decode();
  }
}
