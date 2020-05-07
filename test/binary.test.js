/* eslint-disable no-undef */
import Parser from '../src/index'

const p = new Parser()

// test('', () => {
//   expect(true).toBe(true)
// }, 0)

test('1+2', () => {
  expect(p.parseString(`1+3`)).toBe(4)
}, 0)

test('typeof(3-4)', () => {
  expect(p.parseString(`typeof(3-4)`)).toBe('number')
}, 0)