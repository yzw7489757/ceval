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

// test('++1', () => {
//   expect(p.parseString('++1')).toEqual(2)
// }, 0)
// test('--1', () => {
//   expect(p.parseString('--1')).toEqual(0)
// }, 0)

// generatorTestInstance('!1', false)
// generatorTestInstance('!0', true)
// generatorTestInstance('!false', true)
// generatorTestInstance('!true', false)
// generatorTestInstance('!undefined', true)
// generatorTestInstance('!null', true)
// generatorTestInstance('!!false', false)
// generatorTestInstance('!!true', true)
// generatorTestInstance('!!undefined', false)
// generatorTestInstance('!!null', false)

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
