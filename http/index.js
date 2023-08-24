const {toMap} = require('../core')
const fastifyApp = require('./fastify-app')
const httpErrorHandler = require('./http-error-handler')

const supportedFrameworks = toMap({
  fastify: () => require('./http-test-base-fastify'),
  express: () => require('./http-test-base-express'),
})

module.exports = ({framework = 'fastify'} = {}) => supportedFrameworks.get(framework)()

module.exports = {
  fastifyApp,
  httpErrorHandler,
  testServer: ({framework = 'fastify'} = {}) => supportedFrameworks.get(framework)(),
}
