import { ScaleDecoder } from "../../scale.decoder";

export class BooleanDecoder extends ScaleDecoder<boolean> {
  decode() {
    const val = parseInt(this.value);

    if (val > 1 || val < 0) {
      throw new Error(`incorrect value`);
    }

    return val > 0;
  }
}
