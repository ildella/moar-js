const {homedir} = require('os')
const {readFileSync} = require('fs')
const https = require('https')
const WebSocket = require('ws')

const {curry} = require('../fusto')
const httpJsonClient = require('../axios/http-json-client')

const polarBasePath = networkNumber => `${homedir()}/.polar/networks/${networkNumber}/volumes/lnd/`

const config = (polarNetwork, {
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
}

const createWs = ({
  baseUrl, macaroon, cert, method = 'GET',
}, endpoint) =>
  new WebSocket(`wss://${baseUrl}${endpoint}?method=${method}`, {
    rejectUnauthorized: false,
    cert,
    headers: {'Grpc-Metadata-Macaroon': macaroon},
  })

const createHttp = ({baseUrl, cert, macaroon}) => httpJsonClient({
  baseURL: `https://${baseUrl}`,
  httpsAgent: new https.Agent({rejectUnauthorized: false, cert}),
  headers: {'Grpc-Metadata-macaroon': macaroon},
})

module.exports = {
  config: curry(config),
  // polarBasePath,
  createWs,
  createHttp,
}
