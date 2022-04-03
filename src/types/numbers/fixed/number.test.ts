import { NumberEncoder } from "./number.encoder";
import { NumberDecoder } from "./number.decoder";
import {
  Int16,
  UInt16,
  Int8,
  UInt8,
  UInt32,
  Int32,
  UInt64,
  Int64,
  UInt128,
  Int128,
} from "../integers";
import { SignedNumberDecoder } from "./signed-number.decoder";

describe("Encode", () => {
  it("uint8", () => {
    expect(new NumberEncoder(new UInt8(69)).encode()).toEqual("0x45");
    expect(new NumberEncoder(new UInt8(100)).encode()).toEqual("0x64");
  });

  it("int8", () => {
    expect(new NumberEncoder(new Int8(69)).encode()).toEqual("0x45");
    expect(new NumberEncoder(new UInt8("100")).encode()).toEqual("0x64");
    expect(new NumberEncoder(new UInt8(-1)).encode()).toEqual("0xff");
    expect(new NumberEncoder(new UInt8(-10)).encode()).toEqual("0xf6");
  });

  it("uint16", () => {
    expect(new NumberEncoder(new UInt16(69)).encode()).toEqual("0x4500");
    expect(new NumberEncoder(new UInt16(100)).encode()).toEqual("0x6400");
    expect(new NumberEncoder(new UInt16(300)).encode()).toEqual("0x2c01");
  });

  it("int16", () => {
    expect(new NumberEncoder(new Int16(69)).encode()).toEqual("0x4500");
    expect(new NumberEncoder(new Int16(100)).encode()).toEqual("0x6400");
    expect(new NumberEncoder(new Int16(-1)).encode()).toEqual("0xffff");
  });

  it("uint32", () => {
    expect(new NumberEncoder(new UInt32(69)).encode()).toEqual("0x45000000");
    expect(new NumberEncoder(new UInt32(16777215n)).encode()).toEqual(
      "0xffffff00"
    );
    expect(new NumberEncoder(new UInt32(4294967295n)).encode()).toEqual(
      "0xffffffff"
    );
  });

  it("int32", () => {
    expect(new NumberEncoder(new Int32(69)).encode()).toEqual("0x45000000");
    expect(new NumberEncoder(new Int32(100n)).encode()).toEqual("0x64000000");
    expect(new NumberEncoder(new Int32(-1n)).encode()).toEqual("0xffffffff");
  });

  it("uint64", () => {
    expect(new NumberEncoder(new UInt64(69n)).encode()).toEqual(
      "0x4500000000000000"
    );
    expect(new NumberEncoder(new UInt64(4294967295n)).encode()).toEqual(
      "0xffffffff00000000"
    );
  });

  it("int64", () => {
    expect(new NumberEncoder(new Int64(69n)).encode()).toEqual(
      "0x4500000000000000"
    );
    expect(new NumberEncoder(new Int64(100n)).encode()).toEqual(
      "0x6400000000000000"
    );
    expect(new NumberEncoder(new Int64(-1n)).encode()).toEqual(
      "0xffffffffffffffff"
    );
  });

  it("uint128", () => {
    expect(new NumberEncoder(new UInt128(69n)).encode()).toEqual(
      "0x45000000000000000000000000000000"
    );
  });

  it("int128", () => {
    expect(new NumberEncoder(new Int128(69n)).encode()).toEqual(
      "0x45000000000000000000000000000000"
    );
    expect(new NumberEncoder(new Int128(100n)).encode()).toEqual(
      "0x64000000000000000000000000000000"
    );
    expect(new NumberEncoder(new Int128(-1n)).encode()).toEqual(
      "0xffffffffffffffffffffffffffffffff"
    );
  });
});

describe("Decode", () => {
  it("uint8", () => {
    expect(new NumberDecoder("0x45").decode().value).toEqual(69n);
    expect(new NumberDecoder("0x64").decode().value).toEqual(100n);
  });

  it("int8", () => {
    expect(new SignedNumberDecoder("0x45").decode().value).toEqual(69n);
    expect(new SignedNumberDecoder("0x64").decode().value).toEqual(100n);
    expect(new SignedNumberDecoder("0xff").decode().value).toEqual(-1n);
    expect(new SignedNumberDecoder("0xf6").decode().value).toEqual(-10n);
  });

  it("uint16", () => {
    expect(new NumberDecoder("0x4500").decode().value).toEqual(69n);
    expect(new NumberDecoder("0x6400").decode().value).toEqual(100n);
    expect(new NumberDecoder("0x2c01").decode().value).toEqual(300n);
  });

  it("int16", () => {
    expect(new SignedNumberDecoder("0x4500").decode().value).toEqual(69n);
    expect(new SignedNumberDecoder("0x6400").decode().value).toEqual(100n);
    expect(new SignedNumberDecoder("0xffff").decode().value).toEqual(-1n);
  });

  it("uint32", () => {
    expect(new NumberDecoder("0x45000000").decode().value).toEqual(69n);
    expect(new NumberDecoder("0xffffff00").decode().value).toEqual(16777215n);
    expect(new NumberDecoder("0xffffffff").decode().value).toEqual(4294967295n);
  });

  it("int32", () => {
    expect(new SignedNumberDecoder("0x45000000").decode().value).toEqual(69n);
    expect(new SignedNumberDecoder("0x64000000").decode().value).toEqual(100n);
    expect(new SignedNumberDecoder("0xffffffff").decode().value).toEqual(-1n);
  });

  it("uint64", () => {
    expect(new NumberDecoder("0x4500000000000000").decode().value).toEqual(69n);
    expect(new NumberDecoder("0xffffffff00000000").decode().value).toEqual(
      4294967295n
    );
  });

  it("int64", () => {
    expect(
      new SignedNumberDecoder("0x4500000000000000").decode().value
    ).toEqual(69n);
    expect(
      new SignedNumberDecoder("0x6400000000000000").decode().value
    ).toEqual(100n);
    expect(
      new SignedNumberDecoder("0xffffffffffffffff").decode().value
    ).toEqual(-1n);
  });

  it("uint128", () => {
    expect(
      new NumberDecoder("0x45000000000000000000000000000000").decode().value
    ).toEqual(69n);
  });

  it("int128", () => {
    expect(
      new SignedNumberDecoder("0x45000000000000000000000000000000").decode()
        .value
    ).toEqual(69n);
    expect(
      new SignedNumberDecoder("0x64000000000000000000000000000000").decode()
        .value
    ).toEqual(100n);
    expect(
      new SignedNumberDecoder("0xffffffffffffffffffffffffffffffff").decode()
        .value
    ).toEqual(-1n);
  });
});
