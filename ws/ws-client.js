const WebSocket = require('ws')
const curry = require('just-curry-it')

// eslint-disable-next-line max-lines-per-function, max-statements
const client = ({
  baseURL,
  // timeout = 2500,
  secure = true,
  address = '0.0.0.0',
  port = secure === true ? 443 : 80,
  rejectUnauthorized = secure !== false,
  protocol = secure === true ? 'wss' : 'ws',
  headers = {},
  verbose = false,
  /*  eslint-disable no-console */
  debug = console.log,
}, {endpoint, method = 'GET'}) => {
  const baseUrl = baseURL || `${protocol}://${address}:${port}`
  const wsConnectionString = `${baseUrl}${endpoint}?method=${method}`
  // console.log({wsConnectionString})
  return new Promise((resolve, reject) => {
    const socket = new WebSocket(
      wsConnectionString,
      {
        rejectUnauthorized,
        headers,
      },
    )
    socket.on('open', () => {
      verbose === true ? debug('Socket opened:', wsConnectionString) : {}
      resolve(socket)
    })
    // socket.on('error', error => warn('WebSocket client error:', error.message))
    socket.on('error', error => {
      const socketError = new Error(`${error.message} @ ${wsConnectionString}`, {cause: error})
      reject(socketError)
    })
  })
}

module.exports = curry(client)
