/*
  Documentation:
    https://jestjs.io/docs/configuration#preset-string
*/

module.exports = {
  testEnvironment: 'node',
  notify: true,
  notifyMode: 'failure-change',
  collectCoverage: false,
  // collectCoverageFrom: [
  //   '*.{js,jsx}',
  // ],
  // coveragePathIgnorePatterns: ['/node_modules/'],
  coverageThreshold: {
    global: {
      branches: 65,
      functions: 85,
      lines: 85,
      statements: 85,
    },
  },
  coverageReporters: ['text', 'text-summary', 'json', 'json-summary', 'lcov', 'clover', 'html'],
  // setupFilesAfterEnv: ['../test/timeout-fast'],
  verbose: false,
}
