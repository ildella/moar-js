// eslint-disable-next-line complexity
const errorHandler = ({verbose = true} = {}) => (error, {
  log,
  id, ip, hostname, originalUrl, url, body, method,
},
reply) => {
  const code = error.status || error.statusCode || 500
  const toPrint = verbose === true ? error : {message: error.message}
  if (code < 500) log.warn({
    id, ip, hostname, originalUrl, url, body, method,
  }, toPrint)
  if (code >= 500) log.error({
    id, ip, hostname, originalUrl, url, body, method,
  }, toPrint)
  return reply.code(code).send(toPrint)
}

module.exports = errorHandler
