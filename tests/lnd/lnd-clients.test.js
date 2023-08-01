const {lndClients} = require('../../lnd')

test('just checking...', () => {
  expect(lndClients).toBeDefined()
})

test('http lnd client', () => {
  const {lndHttp} = lndClients({baseUrl})
  expect(lndHttp).toBeDefined()
})
