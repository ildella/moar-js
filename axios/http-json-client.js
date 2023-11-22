const httpClient = require('./http-client')

// TODO: add content-type only when required

module.exports = ({headers = {}, ...override} = {}) => {
  const parameters = {
    timeout: 2500,
    headers: {
      'Accept': 'application/json',
      'Accept-Encoding': 'gzip, deflate',
      'Content-Type': 'application/json; charset=utf-8',
      ...headers,
    },
    ...override,
  }
  return httpClient(parameters)
}
