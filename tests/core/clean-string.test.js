const {cleanString} = require('../../core')

test('escape', () => {
  const input = 'import { browser, dev, building, version } from \'$app/environment\';'
  expect(cleanString(input)).toEqual('import browser dev building version from app environment')
})
