/* eslint-disable no-undef */
import Parser from '../src/index'

const parse = new Parser().parseString

test('二进制 0b', () => {
  expect(parse('0b01')).toEqual(1)
  expect(parse('0b11')).toEqual(3)
  expect(parse('0b0101')).toEqual(5)
  expect(parse('0b1111')).toEqual(15)
  expect(parse('0b010101')).toEqual(21)
  expect(parse('0b111111')).toEqual(63)

  expect(() => parse('0b0102')).toThrow(SyntaxError)
  expect(() => parse('0b0102.1')).toThrow(SyntaxError)
}, 0)

test('八进制 0[0-7]', () => {
  expect(parse('01')).toEqual(1)
  expect(parse('010')).toEqual(8)
  expect(parse('027')).toEqual(23)
  expect(parse('033')).toEqual(27)
  expect(parse('077')).toEqual(63)
  expect(parse('0100')).toEqual(64)
  expect(parse('0101')).toEqual(65)
  expect(parse('01111')).toEqual(585)

  expect(() => parse('01.0')).toThrow(SyntaxError)
  expect(() => parse('0100.1')).toThrow(SyntaxError)
}, 0)


test('十进制 0?\d*[8-9]{1,}', () => {
  expect(parse('080')).toEqual(80)
  expect(parse('018')).toEqual(18)
  expect(parse('009')).toEqual(9)
  expect(parse('1')).toEqual(1)
  expect(parse('1.1')).toEqual(1.1)
  expect(parse('.1')).toEqual(.1)
  expect(parse('33')).toEqual(33)
  expect(parse('100')).toEqual(100)
  expect(parse('100.00')).toEqual(100)
  expect(parse('099.1')).toEqual(99.1)
}, 0)


test('十六进制 0x[0-9a-fA-F]', () => {
  expect(parse('0x01')).toEqual(1)
  expect(parse('0xa')).toEqual(10)
  expect(parse('0xaf')).toEqual(175)
  expect(parse('0x9fac')).toEqual(40876)

  expect(() => parse('0xg')).toThrow(SyntaxError)
  expect(() => parse('0x1g')).toThrow(SyntaxError)
}, 0)
