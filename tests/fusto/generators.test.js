const {__, generators: {arrayMapping}} = require('../../fusto')

const items = ['a', 'b']
const generator = arrayMapping

test('index generator', async () => {
  const stream = __(generator({items}))
  const values = await stream.toPromise()
  expect(values).toEqual([
    {item: 'a', index: 0},
    {item: 'b', index: 1},
  ])
})

test('prefix and zeroBased', async () => {
  const stream = __(generator({items, prefix: 'doc:'}))
  const values = await stream.toPromise()
  expect(values).toEqual([
    {item: 'doc:a', index: 0},
    {item: 'doc:b', index: 1},
  ])
})

test('index generator in the middle of the stream', async () => {
  const stream = __([1, 2, 3])
  const values = await stream
    .through(__(generator({items})))
    .toPromise()
  expect(values).toEqual([
    {item: 'a', index: 0},
    {item: 'b', index: 1},
  ])
})

test('should generate 6 elements', async () => {
  const stream = __([1, 2, 3])
  const values = await stream
    .map(index => __(generator({items, prefix: index})))
    .merge(1, true) // true is required only when we have parallelism
    .toPromise()
  expect(values).toEqual([
    {item: '1a', index: 0},
    {item: '1b', index: 1},
    {item: '2a', index: 0},
    {item: '2b', index: 1},
    {item: '3a', index: 0},
    {item: '3b', index: 1},
  ])
})
