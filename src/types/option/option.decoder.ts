import { ScaleDecoder } from "../../scale.decoder";

export class OptionDecoder extends ScaleDecoder<null | boolean | any> {
  decode() {
    if (this.value === "0x00") {
      return null;
    }

    if (this.value === "0x02") {
      return false;
    }

    return parseInt(this.value, 16);
  }
}
