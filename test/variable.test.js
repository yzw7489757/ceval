
/* eslint-disable no-undef */
import Parser from '../src/index'

const parse = new Parser().parseString

test('binary =', () => {
  // TODO: support assignment literal declaration

  expect(parse(`var obj = { a: '1'};`)).toEqual(''); // 没有指定返回语句

  expect(parse(`
  var a = { a: 2 };
  var b = { b: a };
  `)).toEqual('');

  expect(parse(`
  var a = { a: 2 };
  var b = { b: 3 };
  b
  `)).toEqual({ b: 3 });

  expect(parse(`
  var a = { a: 2 };
  var b = { b: 3, c: 4 };
  b
  `)).toEqual({ b: 3, c: 4 });

  expect(parse(`
  var a = { a: 2 };
  var b = { b: 3, c: 4, d:{ e: 5 }};
  b
  `)).toEqual({ b: 3, c: 4, d: { e: 5 } });

  expect(parse(`
  var a = { a: 2 };
  var b = { b: 3, c: 4, d:{ e: a }};
  b
  `)).toEqual({ b: 3, c: 4, d: { e: { a: 2 } } });

  expect(parse(`
  var a = { a: [false, true, undefined, null, ''] };
  var b = { b: true, c: undefined, d:{ e: a, f: '1', g: {}}};
  b
  `)).toEqual({ b: true, c: undefined, d: { e: { a: [false, true, undefined, null, ''] }, f: '1', g: {} } });

}, 0)