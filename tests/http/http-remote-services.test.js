const {client} = global.t

test('remote call bad address', done => {
  client()
    .get('/remote')
    .then(() => done('nope'))
    .catch(error => {
      expect(error.status).toBe(502)
      expect(error.message).toBe('getaddrinfo ENOTFOUND fakeurlnonexistent.com')
      done()
    })
})

test('remote call timeout', done => {
  client()
    .get('/remote-timeout')
    .then(() => done('nope'))
    .catch(error => {
      expect(error.status).toBe(408)
      expect(error.message).toBe('Timed out.')
      done()
    })
})
