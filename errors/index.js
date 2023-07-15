const {pipeline, __} = require('../fusto')

const parseAxiosError = error => {
  if (error.isAxiosError === true) {
    const json = error.toJSON()
    const {status, code, config} = json
    const {
      baseURL, url, method, headers, timeout,
    } = config
    if (code === 'ETIMEDOUT') return {
      status: 408,
      code,
      message: 'Timed out.',
      method,
      baseURL,
      url,
      timeout,
    }
    if (status !== 400) return {
      status,
      code,
      method,
      baseURL,
      url,
      timeout,
    }
    const {response: {data}} = error
    // console.log({status, code, data, baseURL, url ,method})
    const {statusCode, error: dataError = {}, message} = data
    const finalMessage = message || dataError.message || 'no message provided in the response, check the server logs' 
    const humanReadableMessage =
      `${status} <-- ${method} ${baseURL}/${url} || ${finalMessage}`
    return {
      status, code, message: humanReadableMessage, baseURL, url, method,
    }
  }
  console.log('NOT AXIOS ERROR :(')
  return error
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
