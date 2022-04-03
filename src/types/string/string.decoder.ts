import { NumberDecoder, UInt8 } from "../numbers";
import { VectorDecoder } from "../vector/vector.decoder";

export class StringDecoder extends VectorDecoder {
  protected decodeElement(str: string) {
    return new NumberDecoder(str, UInt8).decode().value;
  }
}
