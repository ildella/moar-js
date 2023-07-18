const {fastifyApp} = require('moar-js/http')
const {__} = require('moar-js/fusto')

test('http / fastify app', done => {
  const instance = fastifyApp()
  instance.listen({
    port: 0,
    host: '0.0.0.0',
  })
    .then(() => {
      instance.close()
      return done()
    })
    .catch(error => done(error.message))
})

test('fusto', () => {
  expect(__([1]).values()).toEqual([1])
})
