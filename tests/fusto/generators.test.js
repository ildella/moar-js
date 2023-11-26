const {__, nil} = require('../../fusto')

const items = ['a', 'b']

const generator = ({
  // zeroBased = true,
  prefix = '',
} = {}) => (push, next) => {
  // console.log({items})
  items.map((item, index) => {
    // console.log({prefix, item, index})
    // const index = zeroBased ? i : i + 1
    push({item: `${prefix}${item}`, index})
    next()
  })
  // console.log('DONE.')
  push(nil)
}

test('index generator', async () => {
  const stream = __(generator())
  const values = await stream.toPromise()
  expect(values).toEqual([
    {item: 'a', index: 0},
    {item: 'b', index: 1},
  ])
})

test('prefix and zeroBased', async () => {
  const stream = __(generator({prefix: 'doc:'}))
  const values = await stream.toPromise()
  expect(values).toEqual([
    {item: 'doc:a', index: 0},
    {item: 'doc:b', index: 1},
  ])
})

test('index generator in the middle of the stream', async () => {
  const stream = __([1, 2, 3])
  const values = await stream
    .through(__(generator()))
    .toPromise()
  expect(values).toEqual([
    {item: 'a', index: 0},
    {item: 'b', index: 1},
  ])
})

test('should generate 6 elements', async () => {
  const stream = __([1, 2, 3])
  const values = await stream
    .map(index => __(generator({prefix: index})))
    .merge()
    .toPromise()
  // console.log(values)
  expect(values).toEqual([
    {item: '1a', index: 0},
    {item: '2a', index: 0},
    {item: '3a', index: 0},
    {item: '1b', index: 1},
    {item: '2b', index: 1},
    {item: '3b', index: 1},
  ])
})
