const {t} = global

test('basic http test', async () => {
  const {status} = await t.client().get('/health')
  expect(status).toEqual(200)
})

test('http 200', async () => {
  const {status, data} = await t.client().get('/health')
  expect(status).toBe(200)
  expect(data).toHaveProperty('status', 'ok')
  expect(data).toHaveProperty('ip', '127.0.0.1')
})

test('missing - 404 - ok', done => {
  t.client()
    .get('/missing')
    .then(() => done('nope'))
    .catch(error => {
      expect(error.status).toBe(404)
      expect(error.message).toContain('not found')
      done()
    })
})

test('post missing - 400', done => {
  t.client()
    .post('/missing')
    .then(() => done('nope'))
    .catch(error => {
      expect(error.status).toBe(400)
      expect(error.message).toContain('application/json')
      done()
    })
})

test('sync handler - 500', done => {
  t.client()
    // .post('/booom') --> will get 400 for malformed response
    .get('/booom')
    .then(() => done('nope'))
    .catch(error => {
      expect(error.status).toBe(500)
      expect(error.message).toBe('big booom')
      done()
    })
})

test('use another content type', done => {
  t.client({
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
  t.client()
    .get('/abooom')
    .then(() => done('nope'))
    .catch(error => {
      expect(error.status).toBe(500)
      expect(error.message).toBe('async big booom')
      done()
    })
})
