const curry = require('just-curry-it')
const __ = require('exstream.js')
const {isPromise, isFunction} = __

function standard (argument) {}

async function standardAsync (argument) {}

const arrow = argument => {}

const arrowAsync = async (argument1, argument2) => new Promise((resolve, reject) => {
  resolve(1 + 2)
})

const standardCurried = curry(standard)
const arrowCurried = curry(arrow)
const arrowAsyncCurried = curry(arrowAsync)

test('name', () => {
  expect(standard.name).toEqual('standard')
  expect(arrow.name).toEqual('arrow')
  expect(arrowAsync.name).toEqual('arrowAsync')
  expect(standardCurried.name).toEqual('curried')
  expect(arrowCurried.name).toEqual('curried')
})

test('promise', () => {
  expect(isFunction(arrow)).toBe(true)
  expect(isFunction(standard)).toBe(true)
  expect(isFunction(standardAsync)).toBe(true)
  expect(isFunction(arrowAsync)).toBe(true)

  expect(isFunction(arrowAsync)).toBe(true)
  expect(isPromise(arrowAsync())).toBe(true)
  expect(arrowAsync.constructor.name).toBe('AsyncFunction')

  expect(isFunction(standardAsync)).toBe(true)
  expect(standardAsync.constructor.name).toBe('AsyncFunction')
  expect(isPromise(standardAsync())).toBe(true)
})

test('curried', () => {
  expect(isFunction(arrowAsyncCurried)).toBe(true)
  expect(arrowAsyncCurried.name).toBe('curried')
  expect(arrowAsyncCurried.constructor.name).toBe('Function')
  expect(isPromise(arrowAsyncCurried())).toBe(false)
  expect(isPromise(arrowAsyncCurried(1))).toBe(false)
  expect(isPromise(arrowAsyncCurried(1, 1))).toBe(true)
})

test('execute and print', () => {
  console.log(arrowAsync)
  console.log(arrowAsync())
  console.log(arrowAsyncCurried)
})
