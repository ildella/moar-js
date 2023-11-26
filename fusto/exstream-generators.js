const __ = require('exstream.js')

const arrayMapping = ({
  // zeroBased = true,
  prefix = '',
  items,
}) => (push, next) => {
  // console.log({items})
  items.map((item, index) => {
    // console.log({prefix, item, index})
    // const index = zeroBased ? i : i + 1
    push({item: `${prefix}${item}`, index})
    next()
  })
  // console.log('DONE.')
  push(__.nil)
}

module.exports = {arrayMapping}
