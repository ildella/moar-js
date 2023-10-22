const fastify = require('fastify')

module.exports = ({
  logLevel = 'debug',
  loggerTransportTarget = 'pino-pretty',
  name,
} = {}) => fastify({
  ignoreTrailingSlash: true,
  disableRequestLogging: true,
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
