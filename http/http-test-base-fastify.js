const {httpJsonClient, safeHttpClient} = require('../axios')

module.exports = app => ({
  start: () => app.listen({
    port: 0,
    host: '0.0.0.0',
  }),
  stop: () => app.close(),
  client: params => {
    const {address, port} = app.server.address()
    return safeHttpClient(httpJsonClient, {
      baseURL: `http://${address}:${port}`,
      ...params,
    })
  },
  address: () => app.server.address(),
})
