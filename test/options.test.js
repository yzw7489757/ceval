/* eslint-disable no-undef */
import Parser from '../src/index'


test('options endableBitNumber = false', () => {
  const parse = new Parser({
    endableBitNumber: false
  }).parseString

  expect(() => parse('0b0102')).toThrow(Error)
  expect(() => parse('0b0102.1')).toThrow(Error)

  expect(() => parse('01.1')).toThrow(Error)
  expect(() => parse('027.1')).toThrow(Error)

  expect(() => parse('0x01')).toThrow(Error)
  expect(() => parse('0xa')).toThrow(Error)
}, 0)

test('options endableOperators = false', () => {
  const parse = new Parser({
    endableOperators: false
  }).parseString

  expect(() => parse('1 - 1')).toThrow(Error)
  expect(() => parse('1 + 1')).toThrow(Error)
  expect(() => parse('1 * 1')).toThrow(Error)
  expect(() => parse('1 / 1')).toThrow(Error)
  expect(() => parse('1 % 1')).toThrow(Error)
  expect(() => parse('1 ^ 1')).toThrow(Error)
  expect(() => parse('!undefined')).toThrow(Error)
  expect(() => parse('~1')).toThrow(Error)
  expect(() => parse('1||2')).toThrow(Error)
  expect(() => parse('1&&2')).toThrow(Error)
  expect(() => parse('1!=2')).toThrow(Error)
  expect(() => parse('1!==2')).toThrow(Error)
  expect(() => parse('1==2')).toThrow(Error)
  expect(() => parse('1===2')).toThrow(Error)
  expect(() => parse('1>=2')).toThrow(Error)
  expect(() => parse('1<=2')).toThrow(Error)
  expect(() => parse('1>2')).toThrow(Error)
  expect(() => parse('1<2')).toThrow(Error)
  expect(() => parse(`'a' in ['a','b']`)).toThrow(Error)

}, 0)

test('options allowMemberAccess = false', () => {
  const parse = new Parser({
    allowMemberAccess: false
  }).parseString

  expect(() => parse(`a.b`, { a: { b: '1'}})).toThrow(Error)
  expect(() => parse(`a["b"]`, { a: { b: '1'}})).toThrow(Error)

  expect(() => parse('a[1]', { a: ['1','2','3']})).toThrow(Error)
}, 0)
