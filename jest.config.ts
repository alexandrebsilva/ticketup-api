export default {
  roots: ["<rootDir>"],
  preset: "ts-jest",
  testEnvironment: "node",
  collectCoverageFrom: ["/src/**/*.ts"],
  setupFilesAfterEnv: ["./tests/setup.ts"],
  coveragePathIgnorePatterns: [
    "/node_modules/",
    "/dist/",
    "/build/",
    "/src/server.ts",
  ],
  coverageThreshold: {
    global: {
      branches: 85,
      functions: 85,
      lines: 85,
      statements: -10,
    },
  },
  testMatch: [
    "<rootDir>/tests/**/*.test.ts",
    "<rootDir>/tests/**/*.spec.ts",
    "<rootDir>/tests/**/*.play.ts",
  ],
};
