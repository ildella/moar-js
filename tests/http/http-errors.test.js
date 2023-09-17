const {client} = global.t

test('sync handler - 500', done => {
  client()
    // .post('/booom') --> will get 400 for malformed response
    .get('/booom')
    .then(() => done('nope'))
    .catch(error => {
      expect(error.status).toBe(500)
      expect(error.message).toBe('big booom')
      expect(error).toHaveProperty('description')
      done()
    })
})

test('use another content type', done => {
  client({
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'accept': 'application/x-www-form-urlencoded',
    },
  })
    .get('/booom')
    .then(() => done('nope'))
    .catch(error => {
      expect(error.status).toBe(500)
      expect(error.message).toBe('big booom')
      // TODO: review this statement...
      // is 415 Unsupported Media Type: application/x-www-form-urlencoded
      // if do not set client to {'Content-Type': 'application/json'}
      done()
    })
})

test('async handler - 500', done => {
  client()
    .get('/abooom')
    .then(() => done('nope'))
    .catch(error => {
      expect(error.status).toBe(500)
      expect(error.message).toBe('async big booom')
      expect(error.url).toBe('/abooom')
      // expect(error).toEqual({})
      done()
    })
})
