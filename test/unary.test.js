/* eslint-disable no-undef */
import Parser from '../src/index'

const parse = new Parser().parseString

test('unary ["+", "-"]', () => {
  expect(parse('+1')).toEqual(1)
  expect(parse('-1')).toEqual(-1)
  expect(parse('-false')).toEqual(-0)
  expect(parse('-true')).toEqual(-1)
  expect(parse('+false')).toEqual(0)
  expect(parse('+true')).toEqual(1)
}, 0)

test('++1', () => {
  expect(parse('++1')).toEqual(2)
}, 0)

test('--1', () => {
  expect(parse('--1')).toEqual(0)
}, 0)

test('unary ! !!', () => {
  expect(parse('!1')).toEqual(false)
  expect(parse('!0')).toEqual(true)

  expect(parse('!!1')).toEqual(true)
  expect(parse('!!0')).toEqual(false)

  expect(parse('!false')).toEqual(true)
  expect(parse('!true')).toEqual(false)
  expect(parse('!undefined')).toEqual(true)
  expect(parse('!null')).toEqual(true)

  expect(parse('!!false')).toEqual(false)
  expect(parse('!!true')).toEqual(true)
  expect(parse('!!undefined')).toEqual(false)
  expect(parse('!!null')).toEqual(false)
}, 0)

test('unary ~', () => {
  expect(parse('~-1')).toEqual(0)
  expect(parse('~0')).toEqual(-1)
  expect(parse('~1')).toEqual(-2)
}, 0)

test('unary typeof', () => {
  expect(parse('typeof(1)')).toEqual('number')
  expect(parse('typeof(\'1\')')).toEqual('string')
  expect(parse('typeof(true)')).toEqual('boolean')
  expect(parse('typeof(false)')).toEqual('boolean')
  expect(parse('typeof(undefined)')).toEqual('undefined')
  expect(parse('typeof(null)')).toEqual('null')

  expect(parse('typeof 1')).toEqual('number')
  expect(parse('typeof \'1\'')).toEqual('string')
  expect(parse('typeof true')).toEqual('boolean')
  expect(parse('typeof false')).toEqual('boolean')
  expect(parse('typeof undefined')).toEqual('undefined')
  expect(parse('typeof null')).toEqual('null')
}, 0)

test('unary return', () => {
  expect(parse('return(1)')).toEqual(1)
  expect(parse('return(\'1\')')).toEqual('1')
  expect(parse('return(true)')).toEqual(true)
  expect(parse('return(false)')).toEqual(false)
  expect(parse('return(undefined)')).toEqual("") // defaultValue is ""
  expect(parse('return(null)')).toEqual(null)

  expect(parse('return 1')).toEqual(1)
  expect(parse('return \'1\'')).toEqual('1')
  expect(parse('return true')).toEqual(true)
  expect(parse('return false')).toEqual(false)
  expect(parse('return undefined')).toEqual("")//defaultValue is ""
  expect(parse('return null')).toEqual(null)

  expect(parse(`
  return 1;
  return 2;
  `)).toEqual(1)

  expect(parse(`
  return true;
  return false; 
  `)).toEqual(true)

}, 0)

test('unary Math', () => {
  expect(parse('sin(1)')).toEqual(Math.sin(1))
  expect(parse('tan(1)')).toEqual(Math.tan(1))
  expect(parse('cos(1)')).toEqual(Math.cos(1))
}, 0)
