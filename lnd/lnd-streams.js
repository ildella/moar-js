const {__} = require('../fusto')
const websocketSource = require('./websocket-stream-source')

const hasError = json => Object.hasOwn(json, 'error')

module.exports = client => {
  const source = __(websocketSource(client))
    .map(JSON.parse)

  const invoices = source
    // .fork()
    .filter(json => !hasError(json))
    // .tap(item => debug(item))
    .pluck('result')

  const errors = source
    .observe()
    .filter(hasError)

  return {
    invoices,
    errors,
  }
}
