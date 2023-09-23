// eslint-disable-next-line complexity
const errorHandler = ({verbose = true} = {}) => (error, {
  log,
  id, ip, hostname, originalUrl, url, body,
},
reply) => {
  log.debug({
    id, ip, hostname, originalUrl, url, body,
  })
  const code = error.status || error.statusCode || 500
  const toPrint = verbose === true ? error : {message: error.message}
  if (code < 500) log.trace({id, ip}, toPrint)
  if (code >= 500) log.error({id, ip}, toPrint)
  return reply.code(code).send(toPrint)
}

module.exports = errorHandler
