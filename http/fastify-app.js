const fastify = require('fastify')

module.exports = () => fastify({
  // keepAliveTimeout: 5000,
  // connectionTimeout: 5000,
  // requestTimeout: 5000,
  // // headersTimeout: 5000,
  // // maxHeadersCount: 200,
  ignoreTrailingSlash: true,
  disableRequestLogging: true,
  logger: false,
})
