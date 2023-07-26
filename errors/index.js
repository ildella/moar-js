const {pipeline, __} = require('../fusto')

// eslint-disable-next-line complexity
const parseAxiosError = error => {
  if (error.isAxiosError !== true) return error
  const {status, code, config} = error.toJSON()
  const basic = __([config]).pick([
    'method',
    'baseURL',
    'url',
    'timeout',
    // 'headers',
  ]).value()
  // console.log({...basic, status, code})
  if (code === 'ETIMEDOUT') return {
    status: 408,
    code,
    message: 'Timed out.',
    ...basic,
  }
  if (!error.response) return {
    status, code, message: 'no response...', ...basic,
  }
  const {response} = error
  // console.log(response.status)
  // console.log(response.statusText)
  const {data} = response
  const {
    // statusCode,
    error: dataError = {},
    message,
  } = data
  const finalMessage =
      message || dataError.message || 'no message provided in the response, check the server logs'
  const {method, url, baseURL} = basic
  const humanReadableMessage =
      `${status} ${method} ${baseURL}${url} :: ${finalMessage}`
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
