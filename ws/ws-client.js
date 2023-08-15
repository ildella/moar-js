const WebSocket = require('ws')

const curry = require('just-curry-it')

const client = ({
  baseURL,
  address = '0.0.0.0',
  port = 80,
  // timeout = 2500,
  headers = {},
  secure = true,
  rejectUnauthorized = secure !== false,
  protocol = secure === true ? 'wss' : 'ws',
  verbose = false,
  /*  eslint-disable no-console */
  debug = console.log,
  warn = console.warn,
}, {endpoint, method = 'GET'}) => {
  const baseUrl = baseURL || `${protocol}://${address}:${port}`
  const wsConnectionString = `${baseUrl}${endpoint}?method=${method}`
  const socket = new WebSocket(
    wsConnectionString,
    {
      rejectUnauthorized,
      ...headers,
    })
  socket.on('open', () => verbose === true ? debug('Socket opened:', wsConnectionString) : {})
  socket.on('error', error => warn('WebSocket client error:', error.message))
  return socket
}

module.exports = curry(client)
