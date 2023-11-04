const {add, multiply} = require('../../core/math')

const add2 = add(2)
const multiply2 = multiply(2)

test('add', () => {
  expect(add2(2, 3)).toEqual(5)
  expect(add2(2.555, 3.111)).toEqual(5.67)
  expect(add(3, 2.555, -3.111)).toEqual(-0.556)
})

test('multiply', () => {
  expect(multiply2(3, 3)).toEqual(9)
  expect(multiply2(3.4, 3.84)).toEqual(13.06)
})
