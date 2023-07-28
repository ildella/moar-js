/*
  eslint-disable fp/no-this
*/

const exstreamExtras = require('./exstream-extras')
const extreamErrorToJson = require('./extream-error-to-json')
const websocketStreamSource = require('./websocket-stream-source')
const streams = require('./streams')

module.exports = {
  ...exstreamExtras,
  extreamErrorToJson,
  streams,
  websocketStreamSource,
}
