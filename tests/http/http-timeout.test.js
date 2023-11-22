const {jsonClient} = global.t

test('basic http test', async () => {
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
