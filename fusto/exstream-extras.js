const {setTimeout: sleep} = require('timers/promises')
const __ = require('exstream.js')

__.extend('toMap', function () {
  return this.map(json => new Map(Object.entries(json)))
})

__.extend('toPromiseValue', async function (input) {
  const [value] = await this.toPromise(input)
  return value
})

__.extend('sleep', function (delay) {
  return this.map(async item => {
    await sleep(delay)
    return item
  })
    .resolve()
})

__.extend('decorate', function (key, value) {
  // eslint-disable-next-line fp/no-this
  return this.map(item => ({[key]: value, ...item}))
})

__.extend('mapDecorate', function (f, key) {
  // eslint-disable-next-line fp/no-this
  return this.map(async item => {
    const value = await f(item)
    return {[key]: value, ...item}
  })
})

module.exports = {
  __,
  xs: __,
  flow: __,
  chain: __,
  pipeline: __.pipeline,
  curry: __.curry,
  nil: __.nil,
}
