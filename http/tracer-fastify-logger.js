const {local} = require('../tracer')

module.exports = ({app, logLevel}) => {
  const log = local({level: logLevel})
  // app.log = log
  // eslint-disable-next-line unicorn/no-null
  app.decorateRequest('log', null)
  app.addHook('onRequest', (request, reply, done) => {
    request.log = log
    done()
  })
  return log
}
