const {randomBytes} = require('crypto')
const curry = require('just-curry-it')
const pick = require('just-pick')

const buffer = require('./buffer-utils')
const fs = require('./fs-utils')
const numbers = require('./numbers-utils')

const unixTimestamp = () => Math.round(Date.now() / 1000)

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
  pick,
  toMap,
  randomHexString,
  unixTimestamp,
  nowSeconds: unixTimestamp,
}
