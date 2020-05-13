/* eslint-disable no-undef */
import Parser from '../src/index'

const parse = new Parser().parseString

test('Object literal declaration {}', () => {
  expect(parse(`{ a: 1 }`)).toEqual({ a: 1 })

  expect(parse(`{ a: 1, b: 2}`)).toEqual({ a: 1, b: 2})

  expect(parse(`{ a: 1, b: 2, c: undefined, d: false, e: null}`)).toEqual({ a: 1, b: 2, c: undefined, d: false, e: null})

  expect(parse(`{ a: 1, b: 2, c: { d: undefined, e: false, f: null }}`)).toEqual({ a: 1, b: 2, c: { d: undefined, e: false, f: null }})
  expect(parse(`{ a: 1, b: 2, c: { d: undefined, e: { f: false, g: null }}}`)).toEqual({ a: 1, b: 2, c: { d: undefined, e: { f: false, g: null }}})
  expect(parse(`{ a: 1, b: 2, c: { d: undefined, e: { f: false, g: { h: null }}}}`)).toEqual({ a: 1, b: 2, c: { d: undefined, e: { f: false, g: { h: null }}}})
  
}, 0)