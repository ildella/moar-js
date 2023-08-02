const {curry} = require('../fusto')
const {parseAxiosError} = require('../errors')

const safeHttpClient = (client, params) => {
  // console.log({params})
  const instance = client(params)
  instance.interceptors.response.use(
    response => response,
    error => {
      const parsed = parseAxiosError(error)
      // console.log(error.response.data)
      return Promise.reject(parsed)
    }
  )
  return instance
}

module.exports = curry(safeHttpClient)
