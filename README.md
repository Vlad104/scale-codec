# [Scale codec](https://docs.substrate.io/v3/advanced/scale-codec/#codec-s) typescript implementation:

### Scale codec implemented types:
*source code are in src/types/*
- unit8, uint16, uint32, uint64, uint128
- int8, int16, int32m int64, int128
- compact integers
- boolean
- option
- result
- vector
- string

### Each type has own unit-tests that you can find at *.test.ts files

### Run tests:
*You shoud have [nodejs and npm](https://nodejs.org/en/download/) installed to run*
```
git clone https://github.com/Vlad104/scale-codec
cd ../scale-codec
npm ci
npm test
```
