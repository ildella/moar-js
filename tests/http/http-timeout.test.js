const {client} = global.t

test('basic http test', async () => {
  const {status} = await client({timeout: 100}).post('/long', {})
  expect(status).toEqual(200)
})
