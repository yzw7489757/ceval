/* eslint-disable no-undef */
import Parser from '../src/index'

const parse = new Parser().parseString

test('Object literal declaration {}', () => {
  expect(parse(`{ a: 1 }`)).toEqual({ a: 1 })

  expect(parse(`{ a: 1, b: 2}`)).toEqual({ a: 1, b: 2})

  expect(parse(`{ a: 1, b: 2, c: undefined, d: false, e: null}`)).toEqual({ a: 1, b: 2, c: undefined, d: false, e: null})

  expect(parse(`{ a: 1, b: 2, c: { d: undefined, e: false, f: null }}`)).toEqual({ a: 1, b: 2, c: { d: undefined, e: false, f: null }})
  expect(parse(`{ a: 1, b: 2, c: { d: undefined, e: { f: false, g: null }}}`)).toEqual({ a: 1, b: 2, c: { d: undefined, e: { f: false, g: null }}})
  expect(parse(`{ a: 1, b: 2, c: { d: undefined, e: { f: false, g: { h: null }}}}`)).toEqual({ a: 1, b: 2, c: { d: undefined, e: { f: false, g: { h: null }}}})
  
  expect(parse(`var a = { b: 2 };a.b`)).toEqual(2);
  expect(parse(`var a = { b: 2 };a["b"]`)).toEqual(2);
  expect(parse(`var a = { b: 2, c:3 };var b='c';a[b]`)).toEqual(3);
  expect(parse(`var a = { b: 2, c:[1,2,3]};var b='c';a[b]`)).toEqual([1,2,3]);
  expect(parse(`
    var a = { b: 2, c:[1,2,3]};
    var b='c';
    a[b][0] = '0'
    return a[b]
  `)).toEqual(['0',2,3]);
  expect(parse(`
      var arr = [1,2,3];
      arr[0] = '0';
      return arr
  `)).toEqual(['0',2,3]);

  expect(parse(`var a = { b: { c: ['a','b','c','d']} };'c' in a.b`)).toEqual(true);
  expect(parse(`var a = { b: { c: ['a','b','c','d']} };\'c\' in a.b`)).toEqual(true);
  expect(parse(`var a = { b: { c: ['a','b','c','d']} };\'\'c\'\' in a.b`)).toEqual(true);
  expect(parse(`var a = { b: { c: ['a','b','c','d']} };'d' in a.b.c`)).toEqual(true);
  expect(parse(`var a = { b: { c: ['a','b','c','d']} };'e' in a.b.c`)).toEqual(false);

  
}, 0)