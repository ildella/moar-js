const pick = require('just-pick')

/*
  eslint-disable complexity, max-lines-per-function, max-statements, sonarjs/cognitive-complexity
*/
module.exports = error => {
  if (error.isAxiosError !== true) return error
  const {status, code, config} = error.toJSON()
  const basic = pick(config, [
    'method',
    'baseURL',
    'url',
    'timeout',
    // 'headers',
  ])
  // console.info({status, code}, basic, error.message)
  if (code === 'ETIMEDOUT') return {
    status: 408,
    code,
    message: 'Timed out.',
    ...basic,
  }
  if (code === 'ECONNREFUSED') return {
    status: 503,
    code,
    message: error.message,
    ...basic,
  }
  if (code === 'ENOTFOUND') return {
    status: 502,
    code,
    message: error.message,
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
  const {data} = response
  const {error: dataError = {}, message} = data
  const finalMessage =
      message
      || dataError.message
      || error.message
      || 'No message found in the Response. Hope for the server logs.'
  // console.log({{status, code}, basic, finalMessage})
  const {method, url, baseURL} = basic
  const description = `${status} ${method} ${baseURL}${url} :: ${finalMessage}`
  return {
    status,
    message: finalMessage,
    description,
    ...basic,
  }
}
