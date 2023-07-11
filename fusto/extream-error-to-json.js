/*
  TODO:
    curry, optional stack/error, try with monet.js to not use undefined,
    hasStack()
    remove error completely?
*/
module.exports = error => ({
  // isError: true,
  type: 'error',
  input: error.exstreamInput,
  message: error.message,
  stack: error.stack,
  cause: error.cause
    ? {message: error.cause.message, stack: error.cause.stack}
    : 'Not Specified',
  error,
})
