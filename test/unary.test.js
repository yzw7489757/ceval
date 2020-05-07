/* eslint-disable no-undef */
import Parser from '../src/index'

const p = new Parser()

test('unary ["+", "-"]', () => {
  expect(p.parseString('+1')).toEqual(1)
  expect(p.parseString('-1')).toEqual(-1)
  expect(p.parseString('-false')).toEqual(-0)
  expect(p.parseString('-true')).toEqual(-1)
  expect(p.parseString('+false')).toEqual(0)
  expect(p.parseString('+true')).toEqual(1)
}, 0)

test('++1', () => {
  expect(p.parseString('++1')).toEqual(2)
}, 0)

test('--1', () => {
  expect(p.parseString('--1')).toEqual(0)
}, 0)

test('unary ! !!', () => {
  expect(p.parseString('!1')).toEqual(false)
  expect(p.parseString('!0')).toEqual(true)

  expect(p.parseString('!!1')).toEqual(true)
  expect(p.parseString('!!0')).toEqual(false)

  expect(p.parseString('!false')).toEqual(true)
  expect(p.parseString('!true')).toEqual(false)
  expect(p.parseString('!undefined')).toEqual(true)
  expect(p.parseString('!null')).toEqual(true)

  expect(p.parseString('!!false')).toEqual(false)
  expect(p.parseString('!!true')).toEqual(true)
  expect(p.parseString('!!undefined')).toEqual(false)
  expect(p.parseString('!!null')).toEqual(false)
}, 0)

// generatorTestInstance('~-1', 0)
// generatorTestInstance('~0', -1)
// generatorTestInstance('~1', -2)

// generatorTestInstance('typeof(1)', 'number')
// generatorTestInstance('typeof(\'1\')', 'string')
// generatorTestInstance('typeof(true)', 'boolean')
// generatorTestInstance('typeof(false)', 'boolean')
// generatorTestInstance('typeof(undefined)', 'undefined')

// generatorTestInstance('sin(1)', Math.sin(1))
// generatorTestInstance('cos(1)', Math.cos(1))
// generatorTestInstance('tan(1)', Math.tan(1))
