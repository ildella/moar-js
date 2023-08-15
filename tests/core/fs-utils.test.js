const fs = require('fs/promises')

const {fs: {writeText, readText}} = require('../../core')

afterEach(() => fs.unlink('.test-text'))

test('write text', async () => {
  const write = writeText('.test-text')
  const result = await write('hello')
  expect(result).toEqual('hello')
  expect(await readText('.test-text')).toEqual('hello\n')
})
