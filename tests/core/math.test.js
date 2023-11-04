const {add} = require('../../core/math')

const fixed2 = add(2)

test('add', () => {
  expect(fixed2(2, 3)).toEqual(5)
  expect(fixed2(2.555, 3.111)).toEqual(5.67)
  expect(add(3, 2.555, -3.111)).toEqual(-0.556)
})
