const number = text => {
  if (typeof text !== 'string') throw new Error('input must be a string')
  if (text.length === 0) throw new Error('empty string not valid')
  const n = Number(text)
  if (Number.isNaN(n) === true) throw new Error(`string does not represent a number: ${text}`)
  return n
}

const positive = text => {
  const n = number(text)
  if (n < 0) throw new Error('negative')
  return n
}

test('invalid number throw exception', () => {
  expect(() => positive('')).toThrow('empty string')
  expect(() => positive('ds')).toThrow('number')
  expect(() => positive('bbb')).toThrow('bbb')
  expect(() => positive('-1')).toThrow('negative')
})

test('valid', () => {
  expect(positive('0')).toBe(0)
  expect(positive('1')).toBe(1)
  expect(positive('100')).toBe(100)
  expect(positive('100.888')).toBe(100.888)
  expect(positive('0.66')).toBe(0.66)
})
