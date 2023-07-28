const {lndStreams, lndClients} = require('../../lnd')

test('just checking...', () => {
  expect(lndStreams).toBeDefined()
  expect(lndClients).toBeDefined()
})
