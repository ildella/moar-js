const {lndClients} = require('../../lnd')

test('just checking...', () => {
  expect(lndClients).toBeDefined()
})

test.skip('http lnd client', () => {
  const {lndHttp} = lndClients()
  expect(lndHttp).toBeDefined()
})
