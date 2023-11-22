const httpClient = require('./http-client')

module.exports = ({headers = {}, ...options} = {}) => httpClient({
  timeout: 2500,
  headers: {
    'Accept': 'application/json',
    'Accept-Encoding': 'gzip, deflate',
    'Content-Type': 'application/json; charset=utf-8',
    ...headers,
  },
  ...options,
})
