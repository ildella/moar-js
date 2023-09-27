const {lndClients} = require('../../lnd')

test('just checking...', () => {
  expect(lndClients).toBeDefined()
})

// t('http lnd client', () => {
//   const {lndHttp} = lndClients()
//   expect(lndHttp).toBeDefined()
// })
