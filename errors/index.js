// const {IncomingMessage} = require('http')

// const {__} = require('../fusto')
const pick = require('just-pick')

// eslint-disable-next-line complexity, max-lines-per-function, sonarjs/cognitive-complexity
const parseAxiosError = error => {
  if (error.isAxiosError !== true) return error
  const {status, code, config} = error.toJSON()
  const basic = pick(config, [
    'method',
    'baseURL',
    'url',
    'timeout',
    // 'headers',
  ])
  if (code === 'ETIMEDOUT') return {
    status: 408,
    code,
    message: 'Timed out.',
    ...basic,
  }
  if (code === 'EAI_AGAIN') return {
    code,
    message: `${error.message} at ${basic.baseURL}`,
    ...basic,
  }
  if (code === 'DEPTH_ZERO_SELF_SIGNED_CERT') return {
    code,
    message: `${error.message} at ${basic.baseURL}`,
    ...basic,
  }
  if (!error.response) return {
    status, code, message: 'HTTP error with no `response`.', ...basic,
  }
  const {response} = error
  if (!response.data) return {
    status, code, message: 'HTTP error response with no `data`.', ...basic,
  }
  const {data} = response
  const {error: dataError = {}, message} = data
  const finalMessage =
      message
      || dataError.message
      || 'No message provided in the response. Hope for the server logs.'
  // console.log({...basic, status, code, finalMessage})
  const {method, url, baseURL} = basic
  const description = `${status} ${method} ${baseURL}${url} :: ${finalMessage}`
  return {
    status,
    message: finalMessage,
    description,
    ...basic,
  }
}

// const parseIncomingMessage = error => {
//   if (!error.exstreamError) {
//     return error
//   }
//   const {message, stack, exstreamInput} = error
//   const input = exstreamInput
//   if (input._readableState) {
//     const parsed = __([input])
//       .pick(['aborted', 'complete', 'statusCode', 'statusMessage', 'headers'])
//       .value()
//     return {message, stack, input: parsed}
//   }
// }

module.exports = {
  parseAxiosError,
  // parseIncomingMessage,
}
