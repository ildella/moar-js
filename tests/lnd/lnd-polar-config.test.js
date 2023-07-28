const {lndPolarConfig} = require('../../lnd')
const {buffer} = require('../../core')

const {isValidHex, isValidUTF8} = buffer

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

  expect(isValidHex(macaroon)).toBe(true)
  expect(isValidHex(cert)).toBe(false)

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
