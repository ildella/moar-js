// eslint-disable-next-line complexity
const errorHandler = ({printStack = false, verboseDump = false} = {}) => (error, {
  log,
  id, ip, hostname, originalUrl, url, body, method,
},
reply) => {
  const code = error.status || error.statusCode || 500
  const response = {message: error.message, code}
  const message = printStack === true ? error : response
  const basic = {
    method, hostname, url, body,
  }
  const extras = {id, ip, originalUrl}
  const dump = verboseDump === true ? {...basic, ...extras} : basic
  if (code < 500) log.warn(dump, message)
  if (code >= 500) log.error(dump, message)
  return reply.code(code).send(response)
}

module.exports = errorHandler
