const https = require('https')
const WebSocket = require('ws')

const {httpJsonClient, safeHttpClient} = require('../axios')

const createWs = ({
  baseUrl, macaroon, cert, method = 'GET',
}, endpoint) => {
  const wsConnectionString = `wss://${baseUrl}${endpoint}?method=${method}`
  // console.log({wsConnectionString})
  return new WebSocket(wsConnectionString, {
    rejectUnauthorized: false,
    cert,
    headers: {'Grpc-Metadata-Macaroon': macaroon},
  })
}

const create = ({baseUrl, cert, macaroon}) => httpJsonClient({
  baseURL: `https://${baseUrl}`,
  httpsAgent: new https.Agent({rejectUnauthorized: false, cert}),
  headers: {'Grpc-Metadata-macaroon': macaroon},
  timeout: 300,
})

module.exports = {
  createWs,
  createHttp: parameters => safeHttpClient(create, parameters),
}
