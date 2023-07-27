const {__, websocketStreamSource} = require('../fusto')

const hasError = json => Object.hasOwn(json, 'error')

module.exports = client => {
  const source = __(websocketStreamSource(client))
    .map(JSON.parse)

  const feed = source
    // .fork()
    .filter(json => !hasError(json))
    // .tap(item => debug(item))
    .pluck('result')

  const errors = source
    .observe()
    .filter(hasError)

  return {
    feed,
    errors,
  }
}
