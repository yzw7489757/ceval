import { mapVal } from './utils/index';
import {
  // 功能性
  random, min, max, arrayMap as map,
  // 二元
  add, sub, mul, divide, mod, concat, equal, notEqual, greaterThan, lessThan, greaterThanEqual, lessThanEqual, inOperator, setVar, arrayIndex, bitWiseOr, strictNotEqual,
  // 三元
  condition,
  strictEqual
} from './functions';

const system = {
  functions: {
    random,
    min,
    max,
    map
  },
  consts: {
    E: Math.E,
    PI: Math.PI,
    'true': true,
    'false': false,
    "undefined": undefined,
    "null": null
  },
  binaryOps: {
    '+': add,
    '-': sub,
    '*': mul,
    '/': divide,
    '%': mod,
    '^': bitWiseOr,
    '||': concat,
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
    'in': inOperator,
    // 'instanceOf'
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
    'typeof': (v): string => typeof v,
    sin: Math.sin,
    cos: Math.cos,
    tan: Math.tan,
    pow: Math.pow,
  }
}

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

/** @desc 运算符映射表 */
export const optionNameMap = mapVal({}, system, (maps, key, val) => maps[key] = val)