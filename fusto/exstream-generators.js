const __ = require('exstream.js')

const arrayMapping = ({
  // zeroBased = true,
  prefix = '',
  items,
}) => (push, next) => {
  items.map((item, index) => {
    // console.log({prefix, item, index})
    // const index = zeroBased ? i : i + 1
    push({item: `${prefix}${item}`, index})
    next()
  })
  push(__.nil)
}

module.exports = {arrayMapping}
