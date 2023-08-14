const number = text => {
  if (typeof text !== 'string') throw new Error('input must be a string')
  if (text.length === 0) throw new Error('empty string not valid')
  const n = Number(text)
  if (Number.isNaN(n) === true) throw new Error('string does not represent a number')
  return n
}

const positive = text => {
  const n = number(text)
  if (n < 0) throw new Error('negative')
  return n
}

module.exports = {
  number,
  positive,
}
