// const assert = require('assert')
// const {test} = require('node:test')

const lndPolarConfig = require('../../lnd/lnd-polar-config')

const isHexString = string => {
  const hexPattern = /^[0-9a-fA-F]+$/
  return hexPattern.test(string)
}

const isValidUTF8 = str => {
  try {
    Buffer.from(str, 'utf8')
    return true
  } catch (error) {
    return false
  }
}

test('calling network by id', () => {
  const network = lndPolarConfig(3)
  expect(network).toBeDefined()
})

test('load config', () => {
  const network = lndPolarConfig(3)
  const alice = network({username: 'alice'})
  expect(alice).toHaveProperty('macaroon')
  expect(alice).toHaveProperty('cert')
  expect(alice).toHaveProperty('baseUrl')
})

test('check content', () => {
  const network = lndPolarConfig(3)
  const {cert, macaroon} = network({username: 'alice'})

  expect(isHexString(macaroon)).toBe(true)
  expect(isHexString(cert)).toBe(false)

  const certUtf8 = Buffer.from(cert).toString('utf8')
  // console.log(certUtf8)
  expect(isValidUTF8(certUtf8)).toBe(true)
  expect(certUtf8.length).toBe(806)
  expect(certUtf8.startsWith('-----BEGIN CERTIFICATE-----')).toBe(true)
  expect(certUtf8.endsWith('-----END CERTIFICATE-----\n')).toBe(true)
  expect(certUtf8.includes('MIICJzCCAc2gAwIBA')).toBe(true)
  // expect(cert).toHaveProperty('data')
  // expect(cert).toHaveProperty('type')
  // expect(cert).toMatchObject({type: 'Buffer'})
})
