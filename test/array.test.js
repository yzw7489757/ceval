/* eslint-disable no-undef */
import Parser from '../src/index'

const parse = new Parser().parseString

test('binary []', () => {
  expect(parse(`[]`)).toEqual([])
  expect(parse(`[1, 2, 3, 4, 5]`)).toEqual([1, 2, 3, 4, 5])
  expect(parse(`[[1, 2, 3], 4, 5]`)).toEqual([[1, 2, 3], 4, 5])
  expect(parse(`[1, [2, 3, 4], 5]`)).toEqual([1, [2, 3, 4], 5])
  expect(parse(`[1, 2, [3, 4, 5]]`)).toEqual([1, 2, [3, 4, 5]])

  expect(parse(`[[],[],[]]`)).toEqual([[],[],[]])

  expect(parse(`[1*2, false, true, undefined, null]`)).toEqual([2, false, true, undefined, null])
  expect(parse(`[1*2, !false, !true, undefined, null]`)).toEqual([2, true, false, undefined, null])

}, 0)