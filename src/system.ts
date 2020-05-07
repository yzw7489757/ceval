import { 
  // 功能性
  random, min, max, arrayMap as map, 
  // 二元
  add, sub, mul, divide, mod, concat, equal, notEqual, greaterThan, lessThan, greaterThanEqual, lessThanEqual, inOperator, setVar, arrayIndex,
  // 三元
  condition
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
    "undefined": false,
    "null": false
  },
  binaryOps :{
    '+': add,
    '-': sub,
    '*': mul,
    '/': divide,
    '%': mod,
    '^': Math.pow,
    '||': concat,
    '==': equal,
    '!=': notEqual,
    '>': greaterThan,
    '<': lessThan,
    '>=': greaterThanEqual,
    '<=': lessThanEqual,
    'in': inOperator,
    '=': setVar,
    '[': arrayIndex
  },
  ternaryOps :{
    '?': condition
  },
  unaryOps: {
    '+': (v):number => +v,
    '-': (v):number  => -v,
    '!': (v):boolean  => !v,
    '~': (v):number  => ~v,
    '++': (v):number  => v+=1,
    '--': (v):number  => v-=1,
    'typeof':(v) :string => typeof v,
    sin: Math.sin,
    cos: Math.cos,
    tan: Math.tan
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
const opsMap = {};

(function(optionsMap){
  Object.keys(system).forEach(opsKey => {
    if(opsKey === 'consts') return
    const funcs = system[opsKey]
    Object.keys(funcs).forEach(key => {
      const k = "name" in funcs[key] ? funcs[key].name : key;
      optionsMap[optionsMap[key] = k] = key
    })
  })
})(opsMap)

export const optionNameMap = opsMap