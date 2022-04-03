import { ScaleEncoder } from "../../scale.encoder";

export class OptionEncoder extends ScaleEncoder<null | boolean | any> {
  protected forceEncode() {
    if (this.value === null) {
      return new Uint8Array([0x00]);
    }

    if (this.value === false) {
      return new Uint8Array([0x02]);
    }

    if (this.value) {
      return new Uint8Array([0x01]);
    }

    throw new Error(`could not encode Some for value ${this.value}`);
  }

  protected validate() {
    return;
  }
}
