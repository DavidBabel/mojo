// @ts-check
const { pathsToModuleNameMapper } = require("ts-jest");
const { compilerOptions } = require("../tsconfig.json");

/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
const jestConfig = {
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: "<rootDir>/",
  }),
  preset: "ts-jest",
  rootDir: "..",
  testEnvironment: "node",
};

module.exports = jestConfig;
