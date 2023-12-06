const {preset} = require('./jest')

module.exports = {
  ...preset(),
  setupFilesAfterEnv: [
    './tests/http/setup-http',
    './jest/timeout-quick',
  ],
  testMatch: [
    '**/tests/**/*.test.js',
  ],
  collectCoverageFrom: [
    // '**/src/**/*.{js,jsx}',
    '**',
    '!**/tests/**',
    '!jest.*',
    '!.eslint*',
  ],
  // projects: [
  //   '<rootDir>/tests/axios',
  //   '<rootDir>/tests/core',
  //   '<rootDir>/tests/fusto',
  //   '<rootDir>/tests/http',
  //   '<rootDir>/tests/lnd',
  // ],
}
