// @ts-check
const { pathsToModuleNameMapper } = require("ts-jest");
const { compilerOptions } = require("../tsconfig.json");

/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
const jestConfig = {
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: "<rootDir>/",
  }),
  preset: "./tools/jest.preset.js",
  rootDir: "..",
  testEnvironment: "node",
  testTimeout: 10000,
  verbose: true,
};

module.exports = jestConfig;
