const {curry} = require('../fusto')

module.exports = curry((future, {
  host = process.env.LND_HOST,
  port = process.env.LND_PORT,
  macaroonType = 'readonly',
}) => {
  if (!host || !port) throw new Error('Configuration error: mising host or port')
  const baseUrl = `${host}:${port}`
  const macaroon = process.env[`LND_${macaroonType.toUpperCase()}_MACAROON`]
  if (!macaroon) throw new Error('Configuration error: mising macaroon env var')
  const hexCertificate = process.env.LND_TLS_CERT
  if (!hexCertificate) throw new Error('Configuration error: mising cert env var')
  // console.log({macaroon, hexCertificate})
  const cert = Buffer.from(hexCertificate, 'hex').toString('utf8')
  return {macaroon, cert, baseUrl}
})
