const {httpJsonClient} = require('../../axios')

test('no params', () => {
  const client = httpJsonClient()
  const {defaults} = client
  expect(defaults.baseURL).toEqual('https://0.0.0.0:443')
})

test('secure', () => {
  const {defaults} = httpJsonClient({secure: false})
  expect(defaults.baseURL).toEqual('http://0.0.0.0:80')
})

test('address', () => {
  const {defaults} = httpJsonClient({address: 'localhost'})
  expect(defaults.baseURL).toEqual('https://localhost:443')
})

test('hostname', () => {
  const {defaults} = httpJsonClient({hostname: 'localhost'})
  expect(defaults.baseURL).toEqual('https://localhost:443')
})

test('force URL with HTTPS but ignore self-signed certificats', () => {
  const {defaults} = httpJsonClient({baseURL: 'https://localhost:5555', secure: false})
  expect(defaults.baseURL).toEqual('https://localhost:5555')
  expect(defaults.httpsAgent.options.rejectUnauthorized).toEqual(false)
})
