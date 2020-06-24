/* eslint-disable no-undef */
import Parser from '../src/index'

const parse = new Parser().parseString

test('二进制 0b', () => {
  expect(parse('0b01')).toBe(1)
  expect(parse('0b11')).toBe(3)
  expect(parse('0b0101')).toBe(5)
  expect(parse('0b1111')).toBe(15)
  expect(parse('0b010101')).toBe(21)
  expect(parse('0b111111')).toBe(63)

  expect(() => parse('0b0102')).toThrow(SyntaxError)
  expect(() => parse('0b0102.1')).toThrow(SyntaxError)
}, 0)

test('八进制 0[0-7]', () => {
  expect(parse('01')).toBe(1)
  expect(parse('010')).toBe(8)
  expect(parse('027')).toBe(23)
  expect(parse('033')).toBe(27)
  expect(parse('077')).toBe(63)
  expect(parse('0100')).toBe(64)
  expect(parse('0101')).toBe(65)
  expect(parse('01111')).toBe(585)

  expect(() => parse('01.0')).toThrow(SyntaxError)
  expect(() => parse('0100.1')).toThrow(SyntaxError)
}, 0)


test('十进制 0?\d*[8-9]{1,}', () => {
  expect(parse('080')).toBe(80)
  expect(parse('018')).toBe(18)
  expect(parse('009')).toBe(9)
  expect(parse('1')).toBe(1)
  expect(parse('1.1')).toBe(1.1)
  expect(parse('.1')).toBe(.1)
  expect(parse('33')).toBe(33)
  expect(parse('100')).toBe(100)
  expect(parse('100.00')).toBe(100)
  expect(parse('099.1')).toBe(99.1)
}, 0)


test('十六进制 0x[0-9a-fA-F]', () => {
  expect(parse('0x01')).toBe(1)
  expect(parse('0xa')).toBe(10)
  expect(parse('0xaf')).toBe(175)
  expect(parse('0x9fac')).toBe(40876)

  expect(() => parse('0xg')).toThrow(SyntaxError)
  expect(() => parse('0x1g')).toThrow(SyntaxError)
}, 0)


/** 
 * info: NaN !== NaN
 * es5id: 8.5_A1
 * description: Compare NaN with NaN
 * https://github.com/tc39/test262/blob/5908ed29ac04a9f5582bb774ca07f8089d3cddfd/test/language/types/number/S8.5_A1.js
 */
test('NaN !== NaN', () => {
// CHECK #1
  expect(parse(`
    var x = NaN;
    var y = NaN;
    return(x !== y);
  `)).toBe(true)
}, 0)


/** 
 * info: Number type represented as the double precision 64-bit format IEEE 754
 * es5id: 8.5_A2.1
 * description: Use 2^53 + 2 number and do some operation with it
 * https://github.com/tc39/test262/blob/5908ed29ac04a9f5582bb774ca07f8089d3cddfd/test/language/types/number/S8.5_A2.1.js
*/
test('Number type represented', () => {
  expect(parse(`
    var x = 9007199254740994.0; /* 2^53 + 2 */
    var y = 1.0 - 1/65536.0; /* 1.0 - 1 / 2^15 */
    var z = x + y;
    var d = z - x;
    return(d === 0)
  `)).toBe(true)
}, 0)

/** 
 *
 * info: Number type represented as the extended precision 64-bit format IEEE 754
 * es5id: 8.5_A2.2
 * description: Use 2^53 + 2 number and do some operation with it
 * https://github.com/tc39/test262/blob/5908ed29ac04a9f5582bb774ca07f8089d3cddfd/test/language/types/number/S8.5_A2.2.js
*/
test('Number type represented', () => {
  expect(parse(`
  var x = 9007199254740994.0; /* 2^53 + 2 */
  var y = 1.0 - 1/65536.0;
  var z = x + y;
  var d = z - x;
  return(d === 2)
`)).toBe(false)
}, 0)

/** 
 * info: NaN expression has a type Number
 * es5id: 8.5_A3
 * description: Check type of NaN
 * https://github.com/tc39/test262/blob/5908ed29ac04a9f5582bb774ca07f8089d3cddfd/test/language/types/number/S8.5_A3.js
*/
test('NaN expression has a type Number', () => {
// CHECK#1
  expect(parse(`
  var x = NaN;

  return(typeof(x) === 'number');
  `)).toBe(true)

// CHECK#2
  expect(parse(`typeof(NaN) === 'number'`)).toBe(true)
}, 0)

/** 
  info: NaN is not a keyword
  es5id: 8.5_A4 T1
  description: Create variable entitled NaN
 * https://github.com/tc39/test262/blob/5908ed29ac04a9f5582bb774ca07f8089d3cddfd/test/language/types/number/S8.5_A4_T1.js
 */
test('', () => {
  expect(() => parse('var NaN')).toThrow(SyntaxError)
}, 0)

/** 
  info: NaN is not a keyword
  es5id: 8.5_A4 T2
  description: Create variable entitled NaN
 * https://github.com/tc39/test262/blob/5908ed29ac04a9f5582bb774ca07f8089d3cddfd/test/language/types/number/S8.5_A4_T2.js
 * https://github.com/tc39/test262/blob/5908ed29ac04a9f5582bb774ca07f8089d3cddfd/test/language/types/number/S8.5_A9.js
 */
test('', () => {
  // JavaScript is support statement, but not here
  expect(() => parse('NaN = 1')).toThrow(SyntaxError)
  expect(() => parse('NaN = "asdf"')).toThrow(SyntaxError)
  expect(() => parse('NaN = true')).toThrow(SyntaxError)
  expect(() => parse('NaN = NaN')).toThrow(SyntaxError)
}, 0)

/** 
  info: NaN not greater or equal zero
  es5id: 8.5_A5
  description: Compare NaN with zero
 * https://github.com/tc39/test262/blob/5908ed29ac04a9f5582bb774ca07f8089d3cddfd/test/language/types/number/S8.5_A5.js
 */
test('', () => {
// CHECK#1
  expect(parse(`
  var x = NaN;
  var x_geq_0=(x >= 0.0);
  return(x_geq_0)
  `)).toEqual(false)

// CHECK#2
  expect(parse(`
  var x = NaN;
  var x_leq_0=(x <= 0.0);
  return(x_leq_0)
  `)).toEqual(false)
  
// CHECK#3
  expect(parse(`
  var x = NaN;
  var x_leq_0_OR_geq_0=(x <= 0.0)||(x >= 0.0);
  return(x_leq_0_OR_geq_0)
  `)).toEqual(false)

// CHECK#4
  expect(parse(`
  var x = NaN;
  var x_geq_0_ADD_leq_0=(x >= 0.0) + (x <= 0.0);
  return(x_geq_0_ADD_leq_0 === 0)
  `)).toEqual(true)
}, 0)


/** 
  info: -Infinity expression has a type Number
  es5id: 8.5_A6
  description: Check type of -Infinity
 * https://github.com/tc39/test262/blob/5908ed29ac04a9f5582bb774ca07f8089d3cddfd/test/language/types/number/S8.5_A6.js
 */
test('', () => {
// CHECK#1
  expect(parse(`
  var x=-Infinity;
  return(typeof(x) === 'number')
  `)).toEqual(true)

// CHECK#2
  expect(parse(`
  typeof(-Infinity) === 'number'
  `)).toEqual(true)
}, 0)

/** 
  info: +Infinity expression has a type Number
  es5id: 8.5_A7
  description: Check type of +Infinity
 * https://github.com/tc39/test262/blob/5908ed29ac04a9f5582bb774ca07f8089d3cddfd/test/language/types/number/S8.5_A7.js
 */
test('', () => {
  // CHECK#1
  expect(parse(`
  var x=+Infinity;
  return(typeof(x) === 'number')
  `)).toEqual(true)

// CHECK#2
  expect(parse(`
  typeof(+Infinity) === 'number'
  `)).toEqual(true)
}, 0)

/** 
  info: Infinity is the same as +Infinity
  es5id: 8.5_A8
  description: Compare Infinity and +Infinity
 * https://github.com/tc39/test262/blob/5908ed29ac04a9f5582bb774ca07f8089d3cddfd/test/language/types/number/S8.5_A8.js
 */
test('', () => {
  expect(parse(`
  var p_inf=+Infinity;
  var inf=Infinity;
  return(p_inf!==inf)
  `)).toEqual(false)
}, 0)

/** 
  info: Infinity is not a keyword
  es5id: 8.5_A10 T1
  description: Create variable entitled Infinity
 * https://github.com/tc39/test262/blob/5908ed29ac04a9f5582bb774ca07f8089d3cddfd/test/language/types/number/S8.5_A10_T1.js
 */
test('var Infinity', () => {
  expect(() => parse('var Infinity;')).toThrow(SyntaxError)
}, 0)

/** 
  info: Infinity is not a keyword
  es5id: 8.5_A10 T2
  description: Create variable entitled Infinity
  flags: [noStrict]
 * https://github.com/tc39/test262/blob/5908ed29ac04a9f5582bb774ca07f8089d3cddfd/test/language/types/number/S8.5_A10_T2.js
 */
test('Infinity statement', () => {
  expect(() => parse(`var Infinity=1.0;`)).toThrow(SyntaxError)
  expect(() => parse(`Infinity='asdf';`)).toThrow(SyntaxError)
  expect(() => parse(`Infinity=true;`)).toThrow(SyntaxError)
}, 0)

/** 
  info: The integer 0 has two representations, +0 and -0
  es5id: 8.5_A11_T1
  description: Check 1.0/p_zero !== 1.0/n_zero
 * https://github.com/tc39/test262/blob/5908ed29ac04a9f5582bb774ca07f8089d3cddfd/test/language/types/number/S8.5_A11_T1.js
 */
test('', () => {
  expect(parse(`
  var p_zero=+0;
  var n_zero=-0;
  return(1.0/p_zero !== 1.0/n_zero)
  `)).toBe(true)
}, 0)

/** 
  info: The integer 0 has two representations, +0 and -0
  es5id: 8.5_A11_T2
  description: Compare positive_zero and negative_zero
 * https://github.com/tc39/test262/blob/5908ed29ac04a9f5582bb774ca07f8089d3cddfd/test/language/types/number/S8.5_A11_T2.js
 */
test('', () => {
//CHECK #1
  expect(parse(`
  var p_zero=+0;
  var n_zero=-0;
  return((p_zero == n_zero) !== true)
  `)).toBe(false)

//CHECK #2
  expect(parse(`
  var p_zero=+0;
  var n_zero=-0;
  return((n_zero == 0) !== true)
  `)).toBe(false)

//CHECK #3
  expect(parse(`
  var p_zero=+0;
  var n_zero=-0;
  return((p_zero == -0) !== true)
  `)).toBe(false)

//CHECK #4
  expect(parse(`
  var p_zero=+0;
  var n_zero=-0;
  return((p_zero === 0) !== true)
  `)).toBe(false)

//CHECK #5
  expect(parse(`
  var p_zero=+0;
  var n_zero=-0;
  return((n_zero === -0) !== true)
  `)).toBe(false)
}, 0)

/** 
  info: +Infinity and Infinity are the same as Number.POSITIVE_INFINITY
  es5id: 8.5_A12.1
  description: Compare Infinity and +Infinity with Number.POSITIVE_INFINITY
 * https://github.com/tc39/test262/blob/5908ed29ac04a9f5582bb774ca07f8089d3cddfd/test/language/types/number/S8.5_A12.1.js
 */
test('', () => {
//CHECK #1 
  expect(parse(`
  var p_inf=+Infinity;
  return(p_inf===POSITIVE_INFINITY)
  `, {
    POSITIVE_INFINITY: Number.POSITIVE_INFINITY
  })).toBe(true)

//CHECK #2
  expect(parse(`
  var inf=Infinity;
  return(inf===POSITIVE_INFINITY)
  `, {
    POSITIVE_INFINITY: Number.POSITIVE_INFINITY
  })).toBe(true)

}, 0)

/** 
  info: -Infinity is the same as Number.NEGATIVE_INFINITY
  es5id: 8.5_A12.2
  description: Compare -Infinity with Number.NEGATIVE_INFINITY
 * https://github.com/tc39/test262/blob/5908ed29ac04a9f5582bb774ca07f8089d3cddfd/test/language/types/number/S8.5_A12.2.js
 */
test('', () => {
  expect(parse(`
  var n_inf=-Infinity;
  return(n_inf === NEGATIVE_INFINITY)
  `,{
    NEGATIVE_INFINITY: Number.NEGATIVE_INFINITY
  })).toBe(true)
}, 0)

/** 
  info: |
      Finite nonzero values  that are Normalised having the form s*m*2**e
      where s is +1 or -1, m is a positive integer less than 2**53 but not
      less than s**52 and e is an integer ranging from -1074 to 971
  es5id: 8.5_A13_T2
  description: Finite Non zero values where e is 971
 * https://github.com/tc39/test262/blob/5908ed29ac04a9f5582bb774ca07f8089d3cddfd/test/language/types/number/S8.5_A13_T2.js
 */
test('', () => {
const p = new Parser().parseString
  expect(p(`(1*pow(2,52)*pow(2,971)) === 8.98846567431158e+307`)).toEqual(true)
  expect(p(`(1*(pow(2,53)-1)*pow(2,971)) === 1.7976931348623157e+308`)).toEqual(true)
  expect(p(`(-1*pow(2,52)*pow(2,971)) === -8.98846567431158e+307`)).toEqual(true)
}, 0)

/** 
  info: When number absolute value is bigger of 2**1024 should convert to Infinity
  es5id: 8.5_A14_T1
  description: Create number bigger of 2**1024
 * https://github.com/tc39/test262/blob/5908ed29ac04a9f5582bb774ca07f8089d3cddfd/test/language/types/number/S8.5_A14_T1.js
 */
test('', () => {
  expect(parse(`1e+308*2 === Infinity`)).toEqual(true)
  expect(parse(`(1*(pow(2,53))*(pow(2,971))) === Infinity`)).toEqual(true)
}, 0)

/** 
  info: When number absolute value is bigger of 2**1024 should convert to Infinity
  es5id: 8.5_A14_T2
  description: Create number smaller of -2**1024
 * https://github.com/tc39/test262/blob/5908ed29ac04a9f5582bb774ca07f8089d3cddfd/test/language/types/number/S8.5_A14_T2.js
 */
test('', () => {
  expect(parse(`-1e+308*3 === -Infinity`)).toEqual(true)
  expect(parse(`(-1*(pow(2,53))*(pow(2,971))) === -Infinity`)).toEqual(true)
}, 0)

