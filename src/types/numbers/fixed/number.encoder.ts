import { ScaleEncoder } from "../../../scale.encoder";
import { Integer } from "../integers";

export class NumberEncoder extends ScaleEncoder<Integer> {
  protected forceEncode() {
    return new Uint8Array(this.value.getBytes());
  }

  protected validate() {
    if (!(this.value instanceof Integer)) {
      throw new Error(`value ${this.value} is not a Integer`);
    }

    if (this.value.value > this.value.maxValue) {
      throw new Error(
        `could not create value ${this.value} of ${this.constructor.name}`
      );
    }
  }
}
