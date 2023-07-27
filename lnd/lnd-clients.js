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

const create = ({baseUrl, cert, macaroon}) => httpJsonClient({
  baseURL: `https://${baseUrl}`,
  httpsAgent: new https.Agent({rejectUnauthorized: false, cert}),
  headers: {'Grpc-Metadata-macaroon': macaroon},
})

const {parseAxiosError} = require('../errors')

const createHttp = params => {
  const instance = create(params)
  instance.interceptors.response.use(
    response => response,
    error => {
      const parsed = parseAxiosError(error)
      // console.log(error.response.data)
      return Promise.reject(parsed)
    }
  )
  return instance
}

module.exports = {
  createWs,
  createHttp,
}
