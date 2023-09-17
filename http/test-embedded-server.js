const testServer = require('./test-server')

module.exports = ({appBuilder, appConfiguration, framework = 'fastify'}) => {
  const app = appBuilder({appConfiguration})
  const fastifyTestServer = testServer({framework})
  const {start, stop, client} = fastifyTestServer(app)
  return {
    app,
    client,
    start,
    stop,
  }
}
