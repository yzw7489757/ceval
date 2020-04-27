import * as funcs from './functions';

const system = {
  functions: {
    random: funcs.random,
    min: funcs.min,
    max: funcs.max,
    map: funcs.arrayMap
  },
  consts: {
    E: Math.E,
    PI: Math.PI,
    'true': true,
    'false': false
  },
  binaryOps :{
    '+':funcs.add,
    '-':funcs.sub,
    '*':funcs.mul,
    '/':funcs.divide,
    '%':funcs.mod,
    '^':Math.pow,
    '||':funcs.concat,
    '==':funcs.equal,
    '!=':funcs.notEqual,
    '>':funcs.greaterThan,
    '<':funcs.lessThan,
    '>=':funcs.greaterThanEqual,
    '<=':funcs.lessThanEqual,
    'in':funcs.inOperator,
    '=':funcs.setVar,
    '[':funcs.arrayIndex
  },
  ternaryOps :{
    '?': funcs.condition
  },
  unaryOps: {
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
export const optionNameMap = {
  '+': 'add',
  '-': 'subtract',
  '*': 'multiply',
  '/': 'divide',
  '%': 'remainder',
  '^': 'power',
  '!': 'factorial',
  '<': 'comparison',
  '>': 'comparison',
  '<=': 'comparison',
  '>=': 'comparison',
  '==': 'comparison',
  '!=': 'comparison',
  '||': 'concatenate',
  'and': 'logical',
  'or': 'logical',
  'not': 'logical',
  '?': 'conditional',
  ':': 'conditional',
  '=': 'assignment',
  '[': 'array',
  '()=': 'fndef'
};