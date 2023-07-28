const __ = require('exstream.js')

const websocketStreamSource = require('./websocket-stream-source')

const hasError = json => Object.hasOwn(json, 'error')

module.exports = client => {
  const source = __(websocketStreamSource(client))
    .map(JSON.parse)

  const feed = source
    .filter(json => !hasError(json))

  const errors = source
    .observe()
    .filter(hasError)

  return {
    feed,
    errors,
  }
}
