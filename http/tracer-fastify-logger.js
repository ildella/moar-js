const {local} = require('../tracer')

module.exports = ({app, logLevel}) => {
  const log = local({level: logLevel})
  app.log = log
  app.decorateRequest('log', log)
  // app.decorate('log', log)
  return log
}
