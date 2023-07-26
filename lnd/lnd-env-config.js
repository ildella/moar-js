const {curry} = require('../fusto')

module.exports = curry((future, {
  host = '127.0.0.1',
  port = 8080,
  // username,
  macaroonType = 'readonly',
}) => {
  // const macaroonPath = `${basePath}/${username}/data/chain/bitcoin/regtest/admin.macaroon`
  const baseUrl = `${host}:${port}`
  // const macaroon = process.env[`LND_${macaroonType.toUpperCase()}_MACAROON`]
  const macaroon = process.env.LND_INVOICE_MACAROON
  const cert = process.env.LND_TLS_CERT
  return {macaroon, cert, baseUrl}
})
