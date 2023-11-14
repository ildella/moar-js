const number = text => {
  if (typeof text === 'number') return text
  if (typeof text !== 'string') throw new Error('Input must be a string')
  if (text.length === 0) throw new Error('Empty string not valid')
  const n = Number(text)
  if (Number.isNaN(n) === true) throw new Error(`String ${text} does not represent a number`)
  return n
}

const positive = text => {
  const n = number(text)
  if (n < 0) throw new Error(`${text} is negative`)
  return n
}

module.exports = {
  number,
  positive,
}
