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
  return this.map(async json => {
    await sleep(delay)
    return json
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