const fs = require('./fs-utils')
const buffer = require('./buffer-utils')

const toMap = json => new Map(Object.entries(json))

module.exports = {
  toMap,
  fs,
  buffer,
}
