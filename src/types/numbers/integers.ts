export abstract class Integer {
  readonly value: bigint;

  abstract get size(): bigint;
  abstract get maxValue(): bigint;
  abstract get minValue(): bigint;

  constructor(value: bigint | number | string) {
    if (typeof value === "bigint") {
      this.value = value;
    } else if (typeof value === "number") {
      this.value = BigInt(value);
    } else if (typeof value === "string") {
      this.value = BigInt(value);
    } else {
      throw new Error(`invalid`);
    }
  }

  getBytes() {
    const result: number[] = [];

    for (let i = 0; i < this.size; i++) {
      result.push(this.getByte(i));
    }

    return result;
  }

  getByte(index: number) {
    return Number(this.getBits(index * 8, 8));
  }

  getBits(index: number, count: number) {
    const bigintIndex = BigInt(index);
    let mask = 0n;
    for (let i = 0n; i < count; i++) {
      mask |= 1n << i;
    }
    mask = mask << bigintIndex;

    return (this.value & mask) >> bigintIndex;
  }
}

export abstract class UInt extends Integer {
  get maxValue() {
    return 1n << (8n * this.size);
  }

  get minValue() {
    return 0n;
  }
}

export abstract class Int extends Integer {
  get maxValue() {
    return 1n << (8n * this.size - 1n);
  }

  get minValue() {
    return this.maxValue - (1n << (8n * this.size));
  }
}

export class UInt8 extends UInt {
  get size() {
    return 1n;
  }
}

export class UInt16 extends UInt {
  get size() {
    return 2n;
  }
}

export class UInt32 extends UInt {
  get size() {
    return 4n;
  }
}

export class UInt64 extends UInt {
  get size() {
    return 8n;
  }
}

export class UInt128 extends UInt {
  get size() {
    return 16n;
  }
}

export class Int8 extends Int {
  get size() {
    return 1n;
  }
}

export class Int16 extends Int {
  get size() {
    return 2n;
  }
}

export class Int32 extends Int {
  get size() {
    return 4n;
  }
}

export class Int64 extends Int {
  get size() {
    return 8n;
  }
}

export class Int128 extends Int {
  get size() {
    return 16n;
  }
}

const uints = [UInt8, UInt16, UInt32, UInt64, UInt128];
const ints = [Int8, Int16, Int32, Int64, Int128];

export function createInteger(value: bigint, size?: bigint) {
  const array = value < 0n ? ints : uints;

  const integer = array.find((creator) => {
    const val = new creator(0);
    if (size !== undefined) {
      return size === val.size;
    } else {
      return value >= val.minValue && value <= val.maxValue;
    }
  });

  if (!integer) {
    throw new Error("ss");
  }

  return integer;
}
