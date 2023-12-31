const {toMap} = require('../core')

const supportedFrameworks = toMap({
  fastify: () => require('./http-test-base-fastify'),
  express: () => require('./http-test-base-express'),
})

module.exports = ({framework = 'fastify'} = {}) => supportedFrameworks.get(framework)()
