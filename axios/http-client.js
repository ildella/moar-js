const http = require('http')
const https = require('https')
const axios = require('axios')

module.exports = ({
  baseURL,
  timeout = 5000,
  secure = true,
  address = '0.0.0.0',
  hostname = address || '0.0.0.0',
  port = secure === true ? 443 : 80,
  rejectUnauthorized = secure !== false,
  protocol = secure === true ? 'https' : 'http',
  httpsAgent = new https.Agent({keepAlive: true, rejectUnauthorized}),
  httpAgent = new http.Agent({keepAlive: true}),
  headers,
} = {}) => axios.create({
  baseURL: baseURL || `${protocol}://${hostname}:${port}`,
  timeout,
  httpAgent,
  httpsAgent,
  insecureHTTPParser: false,
  transitional: {clarifyTimeoutError: true},
  headers,
})