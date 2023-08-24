const {toMap} = require('../core')
const fastifyApp = require('./fastify-app')
const httpErrorHandler = require('./http-error-handler')
const gracefulShutdown = require('./graceful-shutdown')

const verbosity = ({app, serviceName = 'api'}) => {
  app.addHook('onReady', () => {
    app.log?.trace('Ready...')
  })
  app.addHook('preValidation', ({
    log, method, url, body,
  }, reply, done) => {
    log.trace(`preValidation: ${method} ${url}`)
    if (body) log.trace(`body: ${JSON.stringify(body)}`)
    done()
  })
  app.addHook('onSend', ({method, url, log}, reply, payload, done) => {
    log.trace(`onSend: ${method} ${url}`)
    reply.header('x-service-name', serviceName)
    done()
  })
}

const supportedFrameworks = toMap({
  fastify: () => require('./http-test-base-fastify'),
  express: () => require('./http-test-base-express'),
})

module.exports = ({framework = 'fastify'} = {}) => supportedFrameworks.get(framework)()

module.exports = {
  fastifyApp,
  httpErrorHandler,
  gracefulShutdown,
  verbosity,
  testServer: ({framework = 'fastify'} = {}) => supportedFrameworks.get(framework)(),
}
