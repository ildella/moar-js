/*
  This is just the HttpJsonClient with the safe applied to parse the axios response in a nice way.
*/

const {defaultHttpJsonClient} = require('../../axios')

test('no params', () => {
  const client = defaultHttpJsonClient()
  const {defaults} = client
  expect(defaults.baseURL).toEqual('https://0.0.0.0:443')
})
