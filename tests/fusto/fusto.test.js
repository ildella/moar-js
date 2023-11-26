const {__, websocketStreamSource, curry} = require('../../fusto')

test('fusto basics', () => {
  expect(__).toBeDefined()
  expect(websocketStreamSource).toBeDefined()
  expect(curry).toBeDefined()
})

test('fusto', () => {
  expect(__([1]).values()).toEqual([1])
})

test('sleep', async () => {
  console.time('process')
  const start = Date.now()
  await __([1, 2, 3])
    .tap(index => console.time(`sleep: ${index}`))
    .sleep(30)
    .tap(index => console.timeEnd(`sleep: ${index}`))
    .toPromise()
  const elapsed = Date.now() - start
  expect(elapsed).toBeGreaterThan(89)
  expect(elapsed).toBeLessThan(100)
})
