const {local} = require('../tracer')

module.exports = ({app, logLevel}) => {
  const log = local({level: logLevel})
  app.addHook('onRequest', (request, reply, done) => {
    // eslint-disable-next-line fp/no-mutation
    request.log = log
    done()
  })
  return log
}
