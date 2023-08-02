const fastify = require('fastify')
const cors = require('@fastify/cors')
const sensible = require('@fastify/sensible')

module.exports = ({
  logLevel = 'debug',
  loggerTransportTarget = 'pino-pretty',
  name,
} = {}) => {
  const instance = fastify({
    ignoreTrailingSlash: true,
    logger: {
      level: logLevel,
      redact: ['req.headers.authorization'],
      name,
      transport: {
        target: loggerTransportTarget,
        options: {
          // messageFormat: '{levelLabel} - {pid} - url:{req.url}',
          colorize: true,
          translateTime: 'yy/mm/dd, HH:MM:ss',
          ignore: 'pid,hostname',
          singleLine: true,
        },
      },
    },
  })
  instance.register(cors, {
    origin: true,
    credentials: false,
    // methods: ['GET', 'PUT', 'POST', 'DELETE'],
  })
  instance.register(sensible)
  return instance
}
