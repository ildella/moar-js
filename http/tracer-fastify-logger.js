const {local} = require('../tracer')

module.exports = ({app, logLevel}) => {
  const log = local({level: logLevel})
  // app.log = log
  app.decorateRequest('userId', null)
  app.addHook('onRequest', (request, reply, done) => {
    request.log = log
    done()
  })
  return log
}
