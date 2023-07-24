const {pipeline, __} = require('../fusto')

// eslint-disable-next-line max-lines-per-function
const parseAxiosError = error => {
  if (error.isAxiosError !== true) return error
  const {status, code, config} = error.toJSON()
  const basic = __([config]).pick([
    'url',
    'method',
    'timeout',
    // 'headers',
  ]).value()
  if (code === 'ETIMEDOUT') return {
    status: 408,
    code,
    message: 'Timed out.',
    ...basic,
  }
  const {response: {data}} = error
  const {
    // statusCode,
    error: dataError = {},
    message,
  } = data
  const finalMessage =
      message || dataError.message || 'no message provided in the response, check the server logs'
  const {method, url} = basic
  const humanReadableMessage =
      `${status} <-- ${method} ${url} || ${finalMessage}`
  // console.log({humanReadableMessage})
  return {
    status,
    message: humanReadableMessage,
    ...basic,
  }
}

const parseIncomingMessage = error => {
  if (!error.exstreamError) {
    return error
  }
  const {message, stack, exstreamInput} = error
  // console.log('exstream error...', message, stack)
  const input = exstreamInput
  if (input._readableState) {
    const parsed = __([input])
      .pick(['aborted', 'complete', 'statusCode', 'statusMessage', 'headers'])
      .value()
    return {message, stack, input: parsed}
  }
}

const aggregateReport = ({field = 'message'} = {}) => pipeline()
  .reduce((aggregate, item) => {
    // console.log({item})
    const {total, messages} = aggregate
    const {[field]: message} = item
    return {
      total: total + 1,
      messages: [...messages, message],
    }
  }, {messages: [], total: 0})

module.exports = {
  parseAxiosError,
  aggregateReport,
  parseIncomingMessage,
}
