/*

Reference specs:
  https://nodejs.org/api/stream.html#class-streamreadable
  https://nodejs.org/api/webstreams.html#class-readablestream
  https://developer.mozilla.org/en-US/docs/Web/API/Streams_API/Using_readable_streams

*/

const {curry} = require('../core')

const {__} = require('./exstream-extras')

const webReadableStream = ({pipeline, log}, readable) => new ReadableStream({
  start (controller) {
    __(readable)
      .through(pipeline)
      .on('end', () => {
        controller.close()
        log?.trace('Chat stream END.')
      })
      .stopOnError(error => {
        log?.warn('Chat stream error: terminating.', error)
        controller.close()
      })
      .each(chunk => controller.enqueue(chunk))
  },
  cancel (reason) {
    log?.debug('Chat stream CANCELED.', {reason})
  },
})

module.exports = curry(webReadableStream)
