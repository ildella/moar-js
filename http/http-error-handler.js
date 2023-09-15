const {parseAxiosError} = require('../errors')

// eslint-disable-next-line complexity
const errorHandler = ({justPrintErrorMessage = false} = {}) => (error, {log}, reply) => {
  log.debug('#### HTTP Server - Error Handler')
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
  const toPrint = justPrintErrorMessage === true ? parsed.message : parsed
  if (code < 500) log.debug(toPrint)
  if (code >= 500) log.error(toPrint)
  return reply.code(code).send(toPrint)
}

module.exports = errorHandler
