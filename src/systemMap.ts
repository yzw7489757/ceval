import { mapVal } from './utils/index';
import {
  // 功能性
  random, min, max, arrayMap as map, _typeof,
  // 二元
  add, sub, mul, divide, mod, withOr, withAlso, equal, notEqual, greaterThan, lessThan, greaterThanEqual, lessThanEqual, inTheTarget, setVar, arrayIndex, bitWiseOr, strictNotEqual,
  // 三元
  condition,
  strictEqual
} from './utils/functions';

const system = {
  functions: {
    random,
    min,
    max,
    map,
    pow: Math.pow,
  },
  consts: {
    E: Math.E,
    PI: Math.PI,
    'true': true,
    'false': false,
    "undefined": undefined,
    "null": null,
    "NaN": Number.NaN,
    "Infinity": Infinity,
    "Map": Object.create(null)
  },
  binaryOps: {
    '+': add,
    '-': sub,
    '*': mul,
    '/': divide,
    '%': mod,
    '^': bitWiseOr,
    '||': withOr,
    '&&': withAlso,
    '==': equal,
    '!=': notEqual,
    '!==': strictNotEqual,
    '>': greaterThan,
    '<': lessThan,
    '>=': greaterThanEqual,
    '<=': lessThanEqual,
    '=': setVar,
    '[': arrayIndex,
    '===': strictEqual,
    'in': inTheTarget,
    // 'instanceOf' // 没必要做这个 Object都访问不了的
  },
  ternaryOps: {
    '?': condition
  },
  unaryOps: {
    '+': (v): number => +v,
    '-': (v): number => -v,
    '!': (v): boolean => !v,
    '~': (v): number => ~v,
    '++': (v): number => v += 1,
    '--': (v): number => v -= 1,
    'typeof': (v): string => _typeof(v),
    'return': v => v,
    sin: Math.sin,
    cos: Math.cos,
    tan: Math.tan,
  },
  syntaxOperator: {
    ':': null,
    '.': null,
  }
}

Object.defineProperty(system.consts, 'Map', {
  get:() => Object.create(null)
})

export default system;

/** @desc 功能函数 */
export type TypeFunction = typeof system.functions;
/** @desc 常量设置 */
export type TypeConst = typeof system.consts;
/** @desc 一元运算符 */
export type TypeUnary = typeof system.unaryOps;
/** @desc 二元运算符 */
export type TypeBinary = typeof system.binaryOps;
/** @desc 三元运算符 */
export type TypeTernary = typeof system.ternaryOps;
/** @desc 词法操作符 */
export type TypeSyntax = typeof system.syntaxOperator;

// 有些运算符不能被修改。
const excludeOperator = ['=', '['];

/** @desc 运算符映射表 */
export const operatorMap = Object.assign(mapVal(Object.create(null), {
  binaryOps: system.binaryOps,
  unaryOps: system.unaryOps,
  ternaryOps: system.ternaryOps,
}, (maps, key, val) => {
  if(!excludeOperator.includes(key)) {
    maps[key] = val
  }
}), { 
  functions: system.functions,
  consts: system.consts
})