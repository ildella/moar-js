const http = require('http')
const https = require('https')
const axios = require('axios')

module.exports = ({
  baseURL,
  hostname = '0.0.0.0',
  port = 80,
  timeout = 2500,
  headers = {},
  secure = true,
  rejectUnauthorized = secure !== false,
  protocol = secure === true ? 'https' : 'http',
  httpsAgent = new https.Agent({keepAlive: true, rejectUnauthorized}),
  httpAgent = new http.Agent({keepAlive: true}),
} = {}) => axios.create({
  baseURL: baseURL || `${protocol}://${hostname}:${port}`,
  timeout,
  httpAgent,
  httpsAgent,
  insecureHTTPParser: false,
  transitional: {clarifyTimeoutError: true},
  headers: {
    'Accept': 'application/json',
    'Accept-Encoding': 'gzip, deflate',
    'Content-Type': 'application/json; charset=utf-8',
    ...headers,
  },
})
