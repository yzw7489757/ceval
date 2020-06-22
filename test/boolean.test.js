import Parser from '../src/index'

const parse = new Parser().parseString

/** 
 * https://github.com/tc39/test262/blob/5908ed29ac04a9f5582bb774ca07f8089d3cddfd/test/language/types/boolean/S8.3_A1_T1.js
 */
test('boolean statement', () => {
  var x = parse(`true`)
  var y = parse(`false`)
// CHECK#1
  expect(x === true).toEqual(true)
// CHECK#2
  expect(y === false).toEqual(true)
});

/** 
 * https://github.com/tc39/test262/blob/5908ed29ac04a9f5582bb774ca07f8089d3cddfd/test/language/types/boolean/S8.3_A1_T2.js
 */
test('boolean compare', () => {
// CHECK#1
  expect(parse(`typeof(true) !== 'boolean'`)).toEqual(false)
// CHECK#2
  expect(parse(`typeof(true) != 'boolean'`)).toEqual(false)
// CHECK#3
  expect(parse(`typeof(false) !== 'boolean'`)).toEqual(false)
// CHECK#4
  expect(parse(`typeof(false) != 'boolean'`)).toEqual(false)
// CHECK#5
  expect(parse(`true === false`)).toEqual(false)
  expect(parse(`true !== false`)).toEqual(true)
// CHECK#6
  expect(parse(`true == false`)).toEqual(false)
  expect(parse(`true != false`)).toEqual(true)
// CHECK#7
  expect(parse(`false === true`)).toEqual(false)
  expect(parse(`false !== true`)).toEqual(true)
// CHECK#8
  expect(parse(`false == true`)).toEqual(false)
  expect(parse(`false != true`)).toEqual(true)
});


/** 
 * https://github.com/tc39/test262/blob/5908ed29ac04a9f5582bb774ca07f8089d3cddfd/test/language/types/boolean/S8.3_A2.2.js
 */
test('boolean logical negation', () => {
// CHECK#1
  expect(parse(`!false !== true`)).toEqual(false)
// CHECK#2
  expect(parse(`!false != true`)).toEqual(false)
// CHECK#3
  expect(parse(`!true !== false`)).toEqual(false)
// CHECK#4
  expect(parse(`!true != false`)).toEqual(false)
});
