const {toMap} = require('../core')
const fastifyApp = require('./fastify-app')
const httpErrorHandler = require('./http-error-handler')
const gracefulShutdown = require('./graceful-shutdown')
const verbosity = require('./fastify-verbosity')
const tracerFastifyLogger = require('./tracer-fastify-logger')

const supportedFrameworks = toMap({
  fastify: () => require('./http-test-base-fastify'),
  express: () => require('./http-test-base-express'),
})

module.exports = ({framework = 'fastify'} = {}) => supportedFrameworks.get(framework)()

module.exports = {
  fastifyApp,
  gracefulShutdown,
  httpErrorHandler,
  verbosity,
  tracerFastifyLogger,
  testServer: ({framework = 'fastify'} = {}) => supportedFrameworks.get(framework)(),
}
