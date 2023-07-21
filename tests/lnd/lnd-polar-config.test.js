// const assert = require('assert')
// const {test} = require('node:test')

const lndPolarConfig = require('../../lnd/lnd-polar-config')

test('calling network by id', () => {
  const network = lndPolarConfig(2)
  expect(network).toBeDefined()
  // const alice = network({username: 'alice'})
})

test('load config', () => {
  const network = lndPolarConfig(3)
  const alice = network({username: 'alice'})
  expect(alice).toHaveProperty('macaroon')
  expect(alice).toHaveProperty('cert')
  expect(alice).toHaveProperty('baseUrl')
})
