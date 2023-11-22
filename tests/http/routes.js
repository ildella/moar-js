const {setTimeout: sleep} = require('timers/promises')
const {defaultHttpJsonClient} = require('../../axios')
const {__} = require('../../fusto/')

// eslint-disable-next-line max-lines-per-function
module.exports = app => {
  app.get('/health', request => {
    const ip = request.socket.remoteAddress
    return {
      api: 'Test Commons API',
      status: 'ok',
      documentation: '/docs',
      ip,
    }
  })

  // eslint-disable-next-line require-await
  app.get('/abooom', async () => {
    // eslint-disable-next-line fp/no-throw
    throw new Error('async big booom')
  })

  app.get('/booom', () => {
    // console.log(request.headers)
    // eslint-disable-next-line fp/no-throw
    throw new Error('big booom')
  })

  app.get('/remote', async () => {
    const {get} = defaultHttpJsonClient('http://fakeurlnonexistent.com')
    await get('/')
  })

  app.get('/remote-timeout', async () => {
    const {get} = defaultHttpJsonClient('http://duckduckgo.com', {timeout: 1})
    await get('/')
  })

  app.post('/long', async () => {
    await sleep(400)
    return {slow: true}
  })

  app.get('/async-pipe-booom', async (request, reply) => {
    await __([1])
      // eslint-disable-next-line require-await
      .map(async () => {
        // eslint-disable-next-line fp/no-throw
        throw new Error('big booom in the async pipeline')
      })
      .resolve()
      .errors((error, push) => push(error))
      .toPromise()
    reply.code(200).send({})
  })

  app.get('/hijack-async-pipe-booom', async (request, reply) => {
    reply.hijack()
    await __([1])
      // eslint-disable-next-line require-await
      .map(async () => {
        // eslint-disable-next-line fp/no-throw
        throw new Error('big booom in the async pipeline')
      })
      .resolve()
      .errors((error, push) => push(error))
      .toPromise(() => reply.code(200).send({}))
    return 'This will be ignored.'
  })

  return app
}
