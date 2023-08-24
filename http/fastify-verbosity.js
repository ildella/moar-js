module.exports = ({app, serviceName = 'api'}) => {
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
