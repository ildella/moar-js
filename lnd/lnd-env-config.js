const {curry} = require('../fusto')

module.exports = curry((future, {
  host = '127.0.0.1',
  port = 8080,
  macaroonType = 'readonly',
}) => {
  const baseUrl = `${host}:${port}`
  const macaroon = process.env[`LND_${macaroonType.toUpperCase()}_MACAROON`]
  if (!macaroon) throw new Error('Configuration error: mising macaroon env var')
  const hexCertificate = process.env.LND_TLS_CERT
  if (!hexCertificate) throw new Error('Configuration error: mising cert env var')
  console.log({macaroon, hexCertificate})
  const cert = Buffer.from(hexCertificate, 'hex').toString('utf8')
  return {macaroon, cert, baseUrl}
})
