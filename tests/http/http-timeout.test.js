const {jsonClient} = global.t

test('timeout is too short', async () => {
  const {post} = jsonClient({timeout: 100})
  await expect(post('/long', {})).rejects.toMatchObject({
    code: 'ETIMEDOUT',
    timeout: 100,
    status: 408,
    message: 'Timed out.',
  })
})

test('timeout is ok', async () => {
  const {status} = await jsonClient({timeout: 500}).post('/long', {})
  expect(status).toEqual(200)
})

test('short timeout with response stream', async () => {
  const {post} = jsonClient({timeout: 100, responseType: 'stream'})
  await expect(post('/stream', {})).rejects.toMatchObject({
    code: 'ETIMEDOUT',
    timeout: 100,
    status: 408,
    message: 'Timed out.',
  })
})

test('wait', async () => {
  const {post} = jsonClient({timeout: 500, responseType: 'stream'})
  const {status} = await post('/stream', {})
  expect(status).toEqual(201)
})
