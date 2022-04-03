import { ScaleEncoder } from "../../scale.encoder";

export class BooleanEncoder extends ScaleEncoder<boolean> {
  protected forceEncode() {
    return this.value ? new Uint8Array([0x01]) : new Uint8Array([0x00]);
  }

  protected validate() {
    if (typeof this.value !== "boolean") {
      throw new Error(`value ${this.value} is not a boolean`);
    }
  }
}
