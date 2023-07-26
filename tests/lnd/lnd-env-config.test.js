// const assert = require('assert')
// const {test} = require('node:test')

const {lndEnvConfig} = require('../../lnd')

test('calling network by id', () => {
  const network = lndEnvConfig()
  expect(network).toBeDefined()
  // const alice = network({username: 'alice'})
})

test('load config', () => {
  process.env.LND_INVOICE_MACAROON = 'a fake macaroon'
  process.env.LND_TLS_CERT = 'a fake cert'
  const network = lndEnvConfig(1)
  const alice = network({username: 'alice', macaroonType: 'invoice'})
  expect(alice).toHaveProperty('baseUrl', '127.0.0.1:8080')
  expect(alice).toHaveProperty('cert', 'a fake cert')
  expect(alice).toHaveProperty('macaroon', 'a fake macaroon')
})
