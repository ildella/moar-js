const {__, websocketStreamSource, curry} = require('../../fusto')

test('fusto basics', () => {
  expect(__).toBeDefined()
  expect(websocketStreamSource).toBeDefined()
  expect(curry).toBeDefined()
})
