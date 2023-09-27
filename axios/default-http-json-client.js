const httpJsonClient = require('./http-json-client')
const safeHttpClient = require('./safe-http-client')

module.exports = (baseURL, parameters = {}) => safeHttpClient(httpJsonClient, {
  ...parameters,
  baseURL,
})
