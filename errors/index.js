const {__} = require('../fusto')

// eslint-disable-next-line complexity, max-lines-per-function
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
  if (code === 'ETIMEDOUT') return {
    status: 408,
    code,
    message: 'Timed out.',
    ...basic,
  }
  if (code === 'EAI_AGAIN') return {
    code,
    message: error.message,
    ...basic,
  }
  if (!error.response) return {
    status, code, message: 'HTTP error with no `response` property.', ...basic,
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
      message
      || dataError.message
      || 'No message provided in the response. Hope for the server logs'
  // console.log({...basic, status, code, finalMessage})
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

module.exports = {
  parseAxiosError,
  parseIncomingMessage,
}
