const buffer = require('./buffer-utils')
const fs = require('./fs-utils')
const numbers = require('./numbers-utils')

const toMap = json => new Map(Object.entries(json))

module.exports = {
  buffer,
  fs,
  numbers,
  toMap,
}
