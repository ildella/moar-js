const https = require('https')
const WebSocket = require('ws')

const httpJsonClient = require('../axios/http-json-client')

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
  createWs,
  createHttp,
}
