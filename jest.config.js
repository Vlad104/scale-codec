/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  maxWorkers: 1,
  testEnvironment: 'node',
  moduleFileExtensions: [
    "js",
    "json",
    "ts"
  ],
  rootDir: "src",
  testRegex: ".*\\.test\\.ts$",
  transform: {
    "^.+\\.(t|j)s$": "ts-jest"
  }
};
