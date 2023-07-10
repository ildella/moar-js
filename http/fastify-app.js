const fastify = require('fastify')
const cors = require('@fastify/cors')
const sensible = require('@fastify/sensible')

module.exports = ({
  logLevel = 'debug',
  // loggerTransportTarget = 'pino-pretty',
  loggerTransportTarget = '@fastify/one-line-logger',
} = {}) => {
  const instance = fastify({
    ignoreTrailingSlash: true,
    logger: {
      level: logLevel,
      transport: {target: loggerTransportTarget},
      // redact: ['req.headers.authorization'],
    },
  })
  instance.register(cors, {
    origin: true,
    credentials: false,
    // methods: ['GET', 'PUT', 'POST', 'DELETE'],
  })
  instance.register(sensible)
  // instance.setErrorHandler((error, request, reply) => {
  //   console.log(error)
  //   reply.send(error)
  // })
  return instance
}
