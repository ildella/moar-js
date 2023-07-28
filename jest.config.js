/*
  Documentation:
    https://jestjs.io/docs/configuration#projects-arraystring--projectconfig
*/

/*
  Uncomment the "projects" section to enable a different jest.config.js per folder.
  Useful to have different setup (eg: database, http...) or different timeouts per folder.
*/

const {jest: {preset}} = require('moar-js-dev')

module.exports = {
  ...preset(),
  // projects: [
  //   '<rootDir>/tests/unit',
  //   '<rootDir>/tests/http',
  // ],
}
