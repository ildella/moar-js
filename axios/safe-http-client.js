const curry = require('just-curry-it')

const {parseAxiosError} = require('../errors')

const safeHttpClient = (client, parameters) => {
  // console.log({params})
  const instance = client(parameters)
  instance.interceptors.response.use(
    response => response,
    error => {
      const parsed = parseAxiosError(error)
      return Promise.reject(parsed)
    }
  )
  return instance
}

module.exports = curry(safeHttpClient)
