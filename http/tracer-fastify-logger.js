const {local} = require('../tracer')

module.exports = ({app, logLevel}) => {
  const log = local({level: logLevel})
  app.log = log
  app.addHook('onRequest', (request, reply, done) => {
    request.log = log
    done()
  })
  return log
}
