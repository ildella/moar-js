const {httpJsonClient, safeHttpClient} = require('../axios')

module.exports = app => {
  /* eslint-disable-next-line fp/no-let */
  let server
  return {
    start: () => {
      /* eslint-disable-next-line fp/no-mutation */
      server = app.listen(0)
    },
    stop: () => server.close(),
    // client: () => axios.create({baseURL: `http://localhost:${server.address().port}`}),
    client: parameters => {
      const {address, port} = app.server.address()
      return safeHttpClient(httpJsonClient, {
        baseURL: `http://${address}:${port}`,
        ...parameters,
      })
    },
  }
}
