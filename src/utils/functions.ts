import { contains, isObject, eliminateQuote } from './index';
import { CevalOptions } from '../interface';

function getDigitLength(num: number){
  return (num.toString().split('.')[1] || '').length;
}

function checkBounds(number: number) {
  return number > Number.MAX_SAFE_INTEGER || number < Number.MIN_SAFE_INTEGER
}

function getBaseNum(a: number, b: number): number {
  const baseNum = Math.pow(10, Math.max(getDigitLength(a), getDigitLength(b)));
  if(checkBounds(a * baseNum) || checkBounds(b * baseNum)) { // 超出边界的情况不予处理
    return 0
  }
  return baseNum
}

const unwantedHandlePercision = (a, b) => {
  // 整数不需要处理 || 非Number也不需要
  return (Number.isInteger(a) && Number.isInteger(b)) || (typeof a !== 'number' || typeof b !== 'number')
}

export function add(a: number, b: number, options: CevalOptions): number {
  if(options.allowHandleNumberPrecision === false || unwantedHandlePercision(a,b)) return a + b
  const baseNum = getBaseNum(a,b);
  return baseNum === 0 ? a + b : (Math.round(a * baseNum) + Math.round(b * baseNum)) / baseNum 
}

export function sub(a: number, b: number, options: CevalOptions): number {
  if(options.allowHandleNumberPrecision === false || unwantedHandlePercision(a,b)) return a - b
  const baseNum = getBaseNum(a,b)
  return baseNum === 0 ? a - b : (Math.round(a * baseNum) - Math.round(b * baseNum)) / baseNum;
}

export function mul(a: number, b: number, options: CevalOptions): number {
  if(options.allowHandleNumberPrecision === false || unwantedHandlePercision(a,b)) return a * b
  const baseNum = getBaseNum(a,b)
  return baseNum === 0 ? a * b : (Math.round(a * baseNum) * Math.round(b * baseNum)) / Math.pow(baseNum, 2);
}

export function divide(a: number, b: number, options: CevalOptions): number {
  if( options.allowHandleNumberPrecision === false || unwantedHandlePercision(a,b)) return a / b
  const baseNum = getBaseNum(a,b)
  return baseNum === 0 ? a / b : (Math.round(a * baseNum) / Math.round(b * baseNum));
}

export function mod(a, b) {
  return a % b;
}

export function equal(a, b) {
  // eslint-disable-next-line
  return a == b;
}

export function strictEqual(a, b) {
  return a === b;
}

export function notEqual(a, b) {
  // eslint-disable-next-line
  return a != b;
}

export function strictNotEqual(a, b) {
  return a !== b;
}

export function greaterThan(a, b) {
  return a > b;
}

export function lessThan(a, b) {
  return a < b;
}

export function greaterThanEqual(a, b) {
  return a >= b;
}

export function _typeof(a){
  return Object.prototype.toString.call(a).match(/^\[object\s*(\w+?)\]$/)[1].toLowerCase()
}

export function lessThanEqual(a, b) {
  return a <= b;
}

export function inTheTarget(a, b) {
  if(typeof b !== 'object' || String(a) !== `${a}` ) throw new Error('first argument must be original type, second must be Array or Object')
  return isObject(b) ? Object.prototype.hasOwnProperty.call(b, eliminateQuote(a)) : contains(b, a)
}

export function bitWiseOr(a, b) {
  return a ^ b
}

export function setVar(name: string | number, value: any, variables: object | Array<any> ) {
  if (variables) variables[name] = value;
  return value;
}

export function arrayIndex(array, index) {
  return array[index | 0];
}

export function condition(cond, yep, nope) {
  return cond ? yep : nope;
}

export function withOr(n1, n2) {
  return n1 ? n1 : n2
}

export function withAlso(n1, n2) {
  return n1 ? n2 : n1
}

export function max(...args: number[]) {
  if (args.length === 1) {
    return Math.max.apply(Math, args);
  } else {
    return Math.max.apply(Math, args);
  }
}

export function min(...args: number[]) {
  if (args.length === 1) {
    return Math.min.apply(Math, args);
  } else {
    return Math.min.apply(Math, args);
  }
}

export function arrayMap(f: (val: any, index?: number) => any, a: any[]) {
  if (typeof f !== 'function') {
    throw new Error('First argument is not a function');
  }
  if (!Array.isArray(a)) {
    throw new Error('Second argument is not an array');
  }
  return a.map(function (x, i) {
    return f(x, i);
  });
}

export function random(a) {
  return Math.random() * (a || 1);
}

function decimalAdd(num1, num2) {
  const num1Digits = (num1.toString().split('.')[1] || '').length;
  const num2Digits = (num2.toString().split('.')[1] || '').length;
  const baseNum = Math.pow(10, Math.max(num1Digits, num2Digits));
  return (num1 * baseNum + num2 * baseNum) / baseNum;
}