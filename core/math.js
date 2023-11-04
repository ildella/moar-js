const curry = require('just-curry-it')

const add = (decimals, a, b) => Number((a + b).toFixed(decimals))

const multiply = (decimals, a, b) => Number((a * b).toFixed(decimals))

module.exports = {
  add: curry(add),
  multiply: curry(multiply),
}
