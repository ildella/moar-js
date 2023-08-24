const curry = require('just-curry-it')

const buffer = require('./buffer-utils')
const fs = require('./fs-utils')
const numbers = require('./numbers-utils')

const toMap = json => new Map(Object.entries(json))

const randomHexString = (length = 40) => {
  const bytes = Math.ceil(length / 2)
  const randomBytes = crypto.randomBytes(bytes)
  return randomBytes.toString('hex').slice(0, length)
}

module.exports = {
  buffer,
  curry,
  fs,
  numbers,
  toMap,
  randomHexString,
}
