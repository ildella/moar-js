const {readFileSync} = require('fs')
const {homedir} = require('os')

const {curry} = require('../fusto')

const polarBasePath = networkNumber => `${homedir()}/.polar/networks/${networkNumber}/volumes/lnd/`

module.exports = curry((polarNetwork, {
  // basePath = polarBasePath(1),
  host = '127.0.0.1',
  port = 8080,
  username,
}) => {
  const basePath = polarBasePath(polarNetwork)
  const macaroonPath = `${basePath}/${username}/data/chain/bitcoin/regtest/admin.macaroon`
  const tlsPath = `${basePath}/${username}/tls.cert`
  const baseUrl = `${host}:${port}`
  const macaroon = readFileSync(macaroonPath).toString('hex')
  const cert = readFileSync(tlsPath)
  return {macaroon, cert, baseUrl}
})
