import { ScaleEncoder } from "../../scale.encoder";

export class ResultEncoder<T, K> extends ScaleEncoder<ScaleEncoder<T>> {
  constructor(
    protected readonly value: ScaleEncoder<T>,
    protected readonly errValue?: ScaleEncoder<K>
  ) {
    super(value);
  }

  protected forceEncode() {
    if (!this.errValue) {
      return new Uint8Array([0x00, ...this.value.getBytes()]);
    }

    return new Uint8Array([0x01, ...this.errValue.getBytes()]);
  }

  protected validate() {
    return;
  }
}
