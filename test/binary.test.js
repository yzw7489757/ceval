/* eslint-disable no-undef */
import Parser from '../src/index'

const parse = new Parser().parseString

test('binary +', () => {
  expect(parse(`1+0`)).toBe(1)
  expect(parse(`1+3`)).toBe(4)
  expect(parse(`1+2+3+4`)).toBe(10)

  expect(parse(`+1+0`)).toBe(1)
  expect(parse(`+1+3`)).toBe(4)
  
  expect(parse(`1+!0`)).toBe(2)
  expect(parse(`1+!!0`)).toBe(1)

  expect(parse(`!(3-3)`)).toBe(true)
  expect(parse(`!(3-2)`)).toBe(false)

  expect(parse(`1+!true`)).toBe(1)
  expect(parse(`1+!!true`)).toBe(2)
  expect(parse(`1+!false`)).toBe(2)
  expect(parse(`1+!!false`)).toBe(1)

  expect(parse(`1+null`)).toBe(1)
  expect(parse(`1+!null`)).toBe(2)
  expect(parse(`1+!!null`)).toBe(1)

  expect(parse(`typeof(3+4)`)).toBe('number')
  expect(parse(`!typeof(3+4)`)).toBe(false)

  expect(parse(`~1+2`)).toBe(0)
  expect(parse(`1+~2`)).toBe(-2)
  expect(parse(`~1+~2`)).toBe(-5)
}, 0)

test('binary -', () => {
  expect(parse(`1-2`)).toBe(-1)
  expect(parse(`1-2-3`)).toBe(-4)

  expect(parse(`-1-2`)).toBe(-3)
  expect(parse(`-1-2-3`)).toBe(-6)

  expect(parse(`1-!true`)).toBe(1)
  expect(parse(`1-!!true`)).toBe(0)
  expect(parse(`1-!false`)).toBe(0)
  expect(parse(`1-!!false`)).toBe(1)

  expect(parse(`1-null`)).toBe(1)
  expect(parse(`1-!null`)).toBe(0)
  expect(parse(`1-!!null`)).toBe(1)

  expect(parse(`1-!1`)).toBe(1)
  expect(parse(`1-!!1`)).toBe(0)

  expect(parse(`typeof(3-4)`)).toBe('number')
  expect(parse(`!typeof(3-4)`)).toBe(false)

  expect(parse(`~1-2`)).toBe(-4)
  expect(parse(`1-~2`)).toBe(4)
  expect(parse(`~1-~2`)).toBe(1)
}, 0)

test('binary + -', () => {
  expect(parse(`1-2+3-4`)).toBe(-2)
  expect(parse(`1-2-3-4`)).toBe(-8)
}, 0)

test('binary *', () => {
  expect(parse(`1*2`)).toBe(2)
  expect(parse(`1*2*3`)).toBe(6)

  expect(parse(`+1*2`)).toBe(2)
  expect(parse(`+1*2*3`)).toBe(6)

  expect(parse(`-1*2`)).toBe(-2)
  expect(parse(`-1*2*3`)).toBe(-6)

  expect(parse(`1*!true`)).toBe(0)
  expect(parse(`1*!!true`)).toBe(1)
  expect(parse(`1*!false`)).toBe(1)
  expect(parse(`1*!!false`)).toBe(0)

  expect(parse(`1*null`)).toBe(0)
  expect(parse(`1*!null`)).toBe(1)
  expect(parse(`1*!!null`)).toBe(0)

  expect(parse(`1*!1`)).toBe(0)
  expect(parse(`1*!!1`)).toBe(1)

  expect(parse(`~1*2`)).toBe(-4)
  expect(parse(`1*~2`)).toBe(-3)
  expect(parse(`~1*~2`)).toBe(6)
}, 0)

test('binary /', () => {
  expect(parse(`1/2`)).toBe(0.5)
  expect(parse(`1/2/3`).toFixed(6)).toBe((1/2/3).toFixed(6))

  expect(parse(`+1/2`)).toBe(0.5)
  expect(parse(`+1/2/3`).toFixed(6)).toBe((1/2/3).toFixed(6))

  expect(parse(`-1/2`)).toBe(-0.5)
  expect(parse(`-1/2/3`).toFixed(6)).toBe((-1/2/3).toFixed(6))

  expect(parse(`1/0`)).toBe(Infinity)

  expect(parse(`!true/1`)).toBe(0)
  expect(parse(`!!true/1`)).toBe(1)
  expect(parse(`!false/1`)).toBe(1)
  expect(parse(`!!false/1`)).toBe(0)

  expect(parse(`null/1`)).toBe(0)
  expect(parse(`!null/1`)).toBe(1)
  expect(parse(`!!null/1`)).toBe(0)

  expect(parse(`!1/1`)).toBe(0)
  expect(parse(`!!1/1`)).toBe(1)

  expect(parse(`~1/2`)).toBe(-1)
  expect(parse(`1/~2`).toFixed(6)).toBe((1/-3).toFixed(6))
  expect(parse(`~1/~2`).toFixed(6)).toBe((-2/-3).toFixed(6))
}, 0)

test('binary %', () => {
  expect(parse(`1%2`)).toBe(1)
  expect(parse(`2%1`)).toBe(0)
  expect(parse(`1%2%3`)).toBe(1)
  expect(parse(`3%2`)).toBe(1)

  expect(parse(`+1%2`)).toBe(1)
  expect(parse(`+2%1`)).toBe(0)
  expect(parse(`+1%2%3`)).toBe(1)
  expect(parse(`+3%2`)).toBe(1)

  expect(parse(`-1%2`)).toBe(-1)
  expect(parse(`-2%1`)).toBe(-0)
  expect(parse(`-1%2%3`)).toBe(-1)
  expect(parse(`-3%2`)).toBe(-1)

  expect(parse(`1%!true`)).toBe(NaN)
  expect(parse(`1%!!true`)).toBe(0)
  expect(parse(`1%!false`)).toBe(0)
  expect(parse(`1%!!false`)).toBe(NaN)

  expect(parse(`1%null`)).toBe(NaN)
  expect(parse(`1%!null`)).toBe(0)
  expect(parse(`1%!!null`)).toBe(NaN)

  expect(parse(`1%!1`)).toBe(NaN)
  expect(parse(`1%!!1`)).toBe(0)

  expect(parse(`~1%2`)).toBe(-0)
  expect(parse(`1%~2`)).toBe(1)
  expect(parse(`~1%~2`)).toBe(-2)
}, 0)

test('binary ^', () => {
  expect(parse(`1^1`)).toBe(0)
  expect(parse(`1^2`)).toBe(3)
  expect(parse(`1^4`)).toBe(5)
  expect(parse(`11^13`)).toBe(6)

  expect(parse(`~1^1`)).toBe(-1)
  expect(parse(`1^~2`)).toBe(-4)
  expect(parse(`~1^~4`)).toBe(5)
  
  expect(parse(`!1^1`)).toBe(1)
  expect(parse(`1^!2`)).toBe(1)
  expect(parse(`!1^!4`)).toBe(0)

  expect(parse(`-1^1`)).toBe(-2)
  expect(parse(`1^-2`)).toBe(-1)
  expect(parse(`-1^-4`)).toBe(3)

  expect(parse(`1^undefined`)).toBe(1)
  expect(parse(`1^null`)).toBe(1)
  expect(parse(`1^false`)).toBe(1)
  expect(parse(`1^true`)).toBe(0)

  expect(parse(`1^1^1`)).toBe(1)
  expect(parse(`1^-2^3`)).toBe(-4)
  expect(parse(`1^2^3`)).toBe(0)
}, 0)

test('binary ||', () => {
  expect(parse(`1 || 1`)).toBe(1)
  expect(parse(`0 || 5`)).toBe(5)

  expect(parse(`~1 || 1`)).toBe(-2)
  expect(parse(`1 || ~2`)).toBe(1)
  expect(parse(`~-1 || ~4`)).toBe(-5)
  
  expect(parse(`!1 || 3`)).toBe(3)
  expect(parse(`1 || !2`)).toBe(1)
  expect(parse(`!1 || !4`)).toBe(false)

  expect(parse(`-1 || 1`)).toBe(-1)
  expect(parse(`1 || -0`)).toBe(1)
  expect(parse(`-0 || 5`)).toBe(5)

  expect(parse(`undefined || 2`)).toBe(2)
  expect(parse(`!null || -2`)).toBe(true)
  expect(parse(`false || 2`)).toBe(2)
  expect(parse(`true || 2`)).toBe(true)

  expect(parse(`false || false || 1`)).toBe(1)
  expect(parse(`~-1 || -2 || 3`)).toBe(-2)
  expect(parse(`!1 || !2 || 3`)).toBe(3)
}, 0)

test('binary ==', () => {
  expect(parse(`1 == 1`)).toBe(true)
  expect(parse(`0 == 5`)).toBe(false)
  expect(parse(`-0 == +0`)).toBe(true)

  expect(parse(`~1 == 1`)).toBe(false)
  expect(parse(`~2 == ~2`)).toBe(true)
  expect(parse(`~-1 == ~4`)).toBe(false)
  
  expect(parse(`!1 == 3`)).toBe(false)
  expect(parse(`1 == !2`)).toBe(false)
  expect(parse(`!1 == !4`)).toBe(true)
  expect(parse(`!-0 == !+0`)).toBe(true)

  expect(parse(`undefined == 2`)).toBe(false)
  expect(parse(`!null == -2`)).toBe(false)
  expect(parse(`false == 0`)).toBe(true)
  expect(parse(`true == 1`)).toBe(true)

  expect(parse(`false == false == 1`)).toBe(true)
  expect(parse(`1 == !false == true`)).toBe(true)
  expect(parse(`!1 == !2 == !3`)).toBe(false)
  expect(parse(`!1 == (!2 == !3)`)).toBe(false)
  expect(parse(`!1 == (!2 == 3)`)).toBe(true)
}, 0)

test('binary !=', () => {
  expect(parse(`1 != 1`)).toBe(false)
  expect(parse(`0 != 5`)).toBe(true)
  expect(parse(`-0 != +0`)).toBe(false)

  expect(parse(`~1 != 1`)).toBe(true)
  expect(parse(`~2 != ~2`)).toBe(false)
  expect(parse(`~-1 != ~4`)).toBe(true)
  
  expect(parse(`!1 != 3`)).toBe(true)
  expect(parse(`1 != !2`)).toBe(true)
  expect(parse(`!1 != !4`)).toBe(false)
  expect(parse(`!-0 != !+0`)).toBe(false)

  expect(parse(`undefined != 2`)).toBe(true)
  expect(parse(`!null != -2`)).toBe(true)
  expect(parse(`false != 0`)).toBe(false)
  expect(parse(`true != 1`)).toBe(false)

  expect(parse(`false != false != 1`)).toBe(true)
  expect(parse(`1 != false != false`)).toBe(true)
  expect(parse(`!1 != !2 != !3`)).toBe(false)
  expect(parse(`1 != (!2 != !3)`)).toBe(true)
  expect(parse(`!1 != (!2 != 3)`)).toBe(true)
}, 0)

test('binary >', () => {
  expect(parse(`1 > 1`)).toBe(false)
  expect(parse(`5 > 0`)).toBe(true)
  expect(parse(`-0 > +0`)).toBe(false)

  expect(parse(`~1 > 1`)).toBe(false)
  expect(parse(`~2 > ~2`)).toBe(false)
  expect(parse(`~-1 > ~4`)).toBe(true)
  
  expect(parse(`!1 > 3`)).toBe(false)
  expect(parse(`1 > !2`)).toBe(true)
  expect(parse(`!1 > !4`)).toBe(false)
  expect(parse(`!-0 > !+0`)).toBe(false)

  expect(parse(`undefined > 2`)).toBe(false)
  expect(parse(`!null > -2`)).toBe(true)
  expect(parse(`false > 0`)).toBe(false)
  expect(parse(`true > 1`)).toBe(false)

  expect(parse(`false > false > 1`)).toBe(false)
  expect(parse(`1 > false > false`)).toBe(true)
  expect(parse(`!1 > !2 > 3`)).toBe(false)
  expect(parse(`1 > (!2 > !3)`)).toBe(true)
  expect(parse(`!1 > (!2 > 3)`)).toBe(false)
}, 0)

test('binary <', () => {
  expect(parse(`1 < 1`)).toBe(false)
  expect(parse(`5 < 0`)).toBe(false)
  expect(parse(`-0 < +0`)).toBe(false)

  expect(parse(`~1 < 1`)).toBe(true)
  expect(parse(`~2 < ~2`)).toBe(false)
  expect(parse(`~-1 < ~4`)).toBe(false)
  
  expect(parse(`!1 < 3`)).toBe(true)
  expect(parse(`1 < !2`)).toBe(false)
  expect(parse(`!1 < !4`)).toBe(false)
  expect(parse(`!-0 < !+0`)).toBe(false)

  expect(parse(`undefined < 2`)).toBe(false)
  expect(parse(`!null < -2`)).toBe(false)
  expect(parse(`false < 0`)).toBe(false)
  expect(parse(`true < 1`)).toBe(false)

  expect(parse(`false < false < 1`)).toBe(true)
  expect(parse(`1 < false < false`)).toBe(false)
  expect(parse(`!1 < !2 < 3`)).toBe(true)
  expect(parse(`1 < (!2 < !3)`)).toBe(false)
  expect(parse(`!1 < (!2 < 3)`)).toBe(true)
}, 0)

test('binary >=', () => {
  expect(parse(`1 >= 1`)).toBe(true)
  expect(parse(`5 >= 0`)).toBe(true)
  expect(parse(`-0 >= +0`)).toBe(true)

  expect(parse(`~1 >= 1`)).toBe(false)
  expect(parse(`~2 >= ~2`)).toBe(true)
  expect(parse(`~-1 >= ~4`)).toBe(true)
  
  expect(parse(`!1 >= 3`)).toBe(false)
  expect(parse(`1 >= !2`)).toBe(true)
  expect(parse(`!1 >= !4`)).toBe(true)
  expect(parse(`!-0 >= !+0`)).toBe(true)

  expect(parse(`undefined >= 2`)).toBe(false)
  expect(parse(`null >= -2`)).toBe(true)
  expect(parse(`false >= 0`)).toBe(true)
  expect(parse(`true >= 1`)).toBe(true)

  expect(parse(`false >= false >= 1`)).toBe(true)
  expect(parse(`1 >= false >= false`)).toBe(true)
  expect(parse(`1 >= 2 >= 3`)).toBe(false)
  expect(parse(`1 >= (2 >= 3)`)).toBe(true)
  expect(parse(`1 >= !(2 >= 3)`)).toBe(true)
}, 0)

test('binary <=', () => {
  expect(parse(`1 <= 1`)).toBe(true)
  expect(parse(`5 <= 0`)).toBe(false)
  expect(parse(`-0 <= +0`)).toBe(true)

  expect(parse(`~1 <= 1`)).toBe(true)
  expect(parse(`~2 <= ~2`)).toBe(true)
  expect(parse(`~-1 <= ~4`)).toBe(false)
  
  expect(parse(`!1 <= 3`)).toBe(true)
  expect(parse(`1 <= !2`)).toBe(false)
  expect(parse(`!1 <= !4`)).toBe(true)
  expect(parse(`!-0 <= !+0`)).toBe(true)

  expect(parse(`undefined <= 2`)).toBe(false)
  expect(parse(`null <= -2`)).toBe(false)
  expect(parse(`false <= 0`)).toBe(true)
  expect(parse(`true <= 1`)).toBe(true)

  expect(parse(`false <= false <= 1`)).toBe(true)
  expect(parse(`1 <= false <= false`)).toBe(true)
  expect(parse(`1 <= 2 <= 3`)).toBe(true)
  expect(parse(`1 <= (2 <= 3)`)).toBe(true)
  expect(parse(`1 <= !(2 <= 3)`)).toBe(false)
}, 0)

test('binary in', () => {

}, 0)

test('binary =', () => {

}, 0)

test('binary ===', () => {
  expect(parse(`1 === 1`)).toBe(true)
  expect(parse(`0 === 5`)).toBe(false)
  expect(parse(`-0 === +0`)).toBe(true)

  expect(parse(`~1 === 1`)).toBe(false)
  expect(parse(`~2 === ~2`)).toBe(true)
  expect(parse(`~-1 === ~4`)).toBe(false)
  
  expect(parse(`!1 === 3`)).toBe(false)
  expect(parse(`1 === !2`)).toBe(false)
  expect(parse(`!1 === !4`)).toBe(true)
  expect(parse(`!-0 === !+0`)).toBe(true)

  expect(parse(`undefined === 2`)).toBe(false)
  expect(parse(`!null === -2`)).toBe(false)
  expect(parse(`false === 0`)).toBe(false)
  expect(parse(`true === 1`)).toBe(false)

  expect(parse(`false === false === 1`)).toBe(false)
  expect(parse(`1 === !false === true`)).toBe(false)
  expect(parse(`1 === !2 === !3`)).toBe(true)
  expect(parse(`1 === (!2 === !3)`)).toBe(false)
  expect(parse(`1 === !(2 === 3)`)).toBe(false)
}, 0)
