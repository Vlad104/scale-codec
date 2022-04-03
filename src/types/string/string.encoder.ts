import { UInt8 } from "../numbers";
import { VectorEncoder } from "../vector/vector.encoder";

export class StringEncoder extends VectorEncoder {
  constructor(protected readonly value: bigint[]) {
    super(value, UInt8);
  }
}
