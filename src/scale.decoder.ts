export abstract class ScaleDecoder<T> {
  constructor(protected readonly value: string) {}

  abstract decode(): T;
}
