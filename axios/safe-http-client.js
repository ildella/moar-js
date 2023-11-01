const parseAxiosError = require('./parse-axios-error')

module.exports = instance => {
  instance.interceptors.response.use(
    response => response,
    error => {
      const parsed = parseAxiosError(error)
      return Promise.reject(parsed)
    }
  )
  return instance
}
