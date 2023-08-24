/*
  Documentation:
    https://jestjs.io/docs/configuration#projects-arraystring--projectconfig
*/

const {preset} = require('./jest')

module.exports = {
  ...preset(),
  projects: [
    '<rootDir>/tests/axios',
    '<rootDir>/tests/core',
    '<rootDir>/tests/fusto',
    '<rootDir>/tests/http',
    '<rootDir>/tests/lnd',
  ],
}
