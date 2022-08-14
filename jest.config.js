export default {
  testEnvironment: 'node',
  modulePathIgnorePatterns: [
    '<rootDir>/node_modules',
  ],
  testMatch: [
    '**/tests/**/*.(spec|test).js',
  ],
  transform: {},
  collectCoverage: true,
  verbose: true,
};
