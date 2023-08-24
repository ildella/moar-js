const {__, websocketStreamSource, curry} = require('../../fusto')

test('fusto basics', () => {
  expect(__).toBeDefined()
  expect(websocketStreamSource).toBeDefined()
  expect(curry).toBeDefined()
})

test('fusto', () => {
  expect(__([1]).values()).toEqual([1])
})
