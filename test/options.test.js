/* eslint-disable no-undef */
import Parser from '../src/index'


test('options endableBitNumber = false', () => {
  const parse = new Parser({
    endableBitNumber: false
  }).parseString

  expect(() => parse('0b0102')).toThrow(Error)
  expect(() => parse('0b0102.1')).toThrow(Error)

  expect(() => parse('01.1')).toThrow(Error)
  expect(() => parse('027.1')).toThrow(Error)

  expect(() => parse('0x01')).toThrow(Error)
  expect(() => parse('0xa')).toThrow(Error)
}, 0)

test('options endableOperators = false', () => {
  const parse = new Parser({
    endableOperators: false
  }).parseString

  expect(() => parse('1 - 1')).toThrow(Error)
  expect(() => parse('1 + 1')).toThrow(Error)
  expect(() => parse('1 * 1')).toThrow(Error)
  expect(() => parse('1 / 1')).toThrow(Error)
  expect(() => parse('1 % 1')).toThrow(Error)
  expect(() => parse('1 ^ 1')).toThrow(Error)
  expect(() => parse('!undefined')).toThrow(Error)
  expect(() => parse('~1')).toThrow(Error)
  expect(() => parse('1||2')).toThrow(Error)
  expect(() => parse('1&&2')).toThrow(Error)
  expect(() => parse('1!=2')).toThrow(Error)
  expect(() => parse('1!==2')).toThrow(Error)
  expect(() => parse('1==2')).toThrow(Error)
  expect(() => parse('1===2')).toThrow(Error)
  expect(() => parse('1>=2')).toThrow(Error)
  expect(() => parse('1<=2')).toThrow(Error)
  expect(() => parse('1>2')).toThrow(Error)
  expect(() => parse('1<2')).toThrow(Error)
  expect(() => parse(`'a' in ['a','b']`)).toThrow(Error)

}, 0)

test('options allowMemberAccess = false', () => {
  const parse = new Parser({
    allowMemberAccess: false
  }).parseString

  expect(() => parse(`a.b`, { a: { b: '1'}})).toThrow(Error)
  expect(() => parse(`a["b"]`, { a: { b: '1'}})).toThrow(Error)

  expect(() => parse('a[1]', { a: ['1','2','3']})).toThrow(Error)
}, 0)

test('options allowOperatorsCovered = false', () => {
  const parse = new Parser({
    allowOperatorsCovered: true
  })
  const { parseString } = parse
  parse.updatePresetValues({
    // unary 
    // !warn 1+1 || +1 Will be hit, should judge argument length
    '+': (...args) => {
      if(args.length === 1) {
        return +args[0] + 1
      }else{
        return args[0] + args[1] + 1
      }
    },
    // !warn 1-1 & -1 Will be hit, should judge argument length
    '-': (...args) => {
      if(args.length === 1) {
        return -args[0] - 1;
      }else{
        return args[0] - args[1] - 1
      }
    },
    
    "typeof": (t) => {
      return Object.prototype.toString.call(t)
    },
    '++': (v) => v += 2,
    'return': v => typeof v === 'string' ? `str => ${v}` : v,
    
    // binary 
    '==': (a,b) => a === b,
    '||' : (a,b) => a && b,
    '&&' : (a,b) => a || b,

    // ternary
    '?': (a,b,c) => a + b + c 
  })

  expect(parseString(`0.1+0.2`)).toBe(1.3);
  expect(parseString(`+0.1`)).toBe(1.1);

  expect(parseString(`0.1-0.2`)).toBe(-1.1);
  expect(parseString(`-0.1`)).toBe(-1.1);

  expect(parseString(`typeof([])`)).toBe(Object.prototype.toString.call([]));
  expect(parseString(`++1`)).toBe(3);

  expect(parseString(`1 == true`)).toBe(false);
  expect(parseString(`false || true`)).toBe(false);
  expect(parseString(`false && true`)).toBe(true);

  expect(parseString(`1?2:3`)).toBe(6);
  

  parse.updateOptions({
    allowOperatorsCovered: false
  })

  expect(parseString(`0.1+0.2`)).toBe(.3);
  expect(parseString(`+0.1`)).toBe(.1);

  expect(parseString(`0.1-0.2`)).toBe(-.1);
  expect(parseString(`-0.1`)).toBe(-.1);

  expect(parseString(`typeof([])`)).toBe('array');
  expect(parseString(`++1`)).toBe(2);
  
  expect(parseString(`1 == true`)).toBe(true);
  expect(parseString(`false || true`)).toBe(true);
  expect(parseString(`false && true`)).toBe(false);

  expect(parseString(`1?2:3`)).toBe(2);

}, 0)

test('options allowHandleNumberPrecision = false', () => {
  const instance = new Parser({
    allowHandleNumberPrecision: true // default
  })

  const parse = instance.parseString;

  expect(parse(`0.1+0.2`)).toBe(0.3);
  expect(parse(`0.2+0.4`)).toBe(0.6);
  expect(parse(`0.7+0.1`)).toBe(0.8);
  expect(parse(`2.22+0.1`)).toBe(2.32);

  expect(parse(`0.3-0.2`)).toBe(0.1);
  expect(parse(`1.0-0.9`)).toBe(0.1);
  expect(parse(`1.5-1.2`)).toBe(0.3);

  expect(parse(`1.2+1.3-2.4`)).toBe(0.1);

  expect(parse(`19.9 * 100`)).toBe(1990)
  expect(parse(`1306377.64 * 100`)).toBe(130637764)
  expect(parse(`1306377.64 * 10 * 10`)).toBe(130637764)
  expect(parse(`0.7 * 180`)).toBe(126)
  expect(parse(`9.7 * 100`)).toBe(970)
  expect(parse(`39.7 * 100`)).toBe(3970)

  expect(parse(`0.3/0.1`)).toBe(3);
  expect(parse(`0.69/10`)).toBe(0.069);

  instance.updateOptions({
    allowHandleNumberPrecision: false
  })

  expect(parse(`0.1+0.2`)).not.toBe(0.3);
  expect(parse(`0.2+0.4`)).not.toBe(0.6);
  expect(parse(`0.7+0.1`)).not.toBe(0.8);
  expect(parse(`2.22+0.1`)).not.toBe(2.32);

  expect(parse(`0.3-0.2`)).not.toBe(0.1);
  expect(parse(`1.0-0.9`)).not.toBe(0.1);
  expect(parse(`1.5-1.2`)).not.toBe(0.3);

  expect(parse(`1.2+1.3-2.4`)).not.toBe(0.1);

  expect(parse(`19.9 * 100`)).not.toBe(1990)
  expect(parse(`1306377.64 * 100`)).not.toBe(130637764)
  expect(parse(`1306377.64 * 10 * 10`)).not.toBe(130637764)
  expect(parse(`0.7 * 180`)).not.toBe(126)
  expect(parse(`9.7 * 100`)).not.toBe(970)
  expect(parse(`39.7 * 100`)).not.toBe(3970)

  expect(parse(`0.3/0.1`)).not.toBe(3);
  expect(parse(`0.69/10`)).not.toBe(0.069);

}, 0)
