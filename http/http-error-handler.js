const {parseAxiosError} = require('../errors')

// eslint-disable-next-line complexity
const errorHandler = () => (error, {log}, reply) => {
  log.trace('#### HTTP Server - Error Handler')
  if (error.code === 'ECONNREFUSED') {
    log.fatal(error.message)
    return reply
      .status(503)
      .send({message: 'Connection to a remote service failed. Hope for the server logs.'})
  }
  if (error.code === 'ETIMEDOUT') {
    log.fatal(error.message)
    return reply
      .status(error.status)
      .send({message: 'Connection to a remote service timed out.'})
  }
  const parsed = parseAxiosError(error)
  const code = parsed.status || parsed.statusCode || 500
  if (code < 500) log.trace(parsed)
  if (code === 500) log.error(parsed)
  return reply.code(code).send(parsed)
}

module.exports = errorHandler
