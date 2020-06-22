import Parser from '../src/index'

const parse = new Parser().parseString

/** 
 * 'typeof null' originally object, but in fact, it should be null
 * https://github.com/tc39/test262/blob/5908ed29ac04a9f5582bb774ca07f8089d3cddfd/test/language/types/null/S8.2_A3.js
 */
test('boolean', () => {
  expect(() => parse(`var null`)).toThrow(SyntaxError)
  
  expect(parse(`null`)).toEqual(null)
  expect(parse(`typeof(null) === 'null'`)).toEqual(true)
  expect(parse(`null === null`)).toEqual(true)

});

/** 
 * https://github.com/tc39/test262/blob/5908ed29ac04a9f5582bb774ca07f8089d3cddfd/test/language/types/null/S8.2_A2.js
 */
test('boolean', () => {
  expect(() => parse(`var null`)).toThrow(SyntaxError)
});

/** 
 * https://github.com/tc39/test262/blob/5908ed29ac04a9f5582bb774ca07f8089d3cddfd/test/language/types/null/S8.2_A1_T1.js
 */
test('boolean', () => {
  expect(parse(`var x = null;x`)).toEqual(null)
});
