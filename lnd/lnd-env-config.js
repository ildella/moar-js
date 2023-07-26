const {curry} = require('../fusto')

module.exports = curry((future, {
  host = '127.0.0.1',
  port = 8080,
  macaroonType = 'readonly',
}) => {
  const baseUrl = `${host}:${port}`
  const macaroon = process.env[`LND_${macaroonType.toUpperCase()}_MACAROON`]
  const hexCertificate = process.env.LND_TLS_CERT
  const cert = Buffer.from(hexCertificate, 'hex').toString('utf8')
  return {macaroon, cert, baseUrl}
})
