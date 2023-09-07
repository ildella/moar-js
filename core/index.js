const {randomBytes} = require('crypto')
const curry = require('just-curry-it')

const buffer = require('./buffer-utils')
const fs = require('./fs-utils')
const numbers = require('./numbers-utils')

const toMap = json => new Map(Object.entries(json))

const randomHexString = (length = 40) => {
  const bytes = Math.ceil(length / 2)
  return randomBytes(bytes).toString('hex').slice(0, length)
}

const cleanString = value => value
  // eslint-disable-next-line no-useless-escape
  .replaceAll(/[ !"#$%&'()+,./:;<=>@[\\\]^{}~\-]/g, ' ')
  .replaceAll('   ', ' ')
  .replaceAll('  ', ' ')
  .trim()

module.exports = {
  buffer,
  curry,
  cleanString,
  fs,
  numbers,
  toMap,
  randomHexString,
}
