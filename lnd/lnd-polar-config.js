const {readFileSync} = require('fs')
const {homedir} = require('os')

const {curry} = require('../fusto')

const polarBasePath = networkNumber => `${homedir()}/.polar/networks/${networkNumber}/volumes/lnd/`

/*
  eslint-disable security/detect-non-literal-fs-filename
*/

module.exports = curry((polarNetwork, {
  host = 'localhost',
  port = '8081',
  username,
  macaroonType = 'readonly',
}) => {
  const basePath = polarBasePath(polarNetwork)
  // const macaroonPath = `${basePath}/${username}/data/chain/bitcoin/regtest/admin.macaroon`
  const macaroonPath = `${basePath}/${username}/data/chain/bitcoin/regtest/${macaroonType}.macaroon`
  const tlsPath = `${basePath}/${username}/tls.cert`
  const baseUrl = `${host}:${port}`
  const macaroon = readFileSync(macaroonPath).toString('hex')
  const cert = readFileSync(tlsPath)
  return {macaroon, cert, baseUrl}
})
