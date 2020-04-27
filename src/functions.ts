import { contains } from './utils';

export function max(...args: number[]) {
  if (arguments.length === 1 && Array.isArray(args[0])) {
    return Math.max.apply(Math, args[0]);
  } else {
    return Math.max.apply(Math, args);
  }
}

export function min(...args: number[]) {
  if (arguments.length === 1 && Array.isArray(args[0])) {
    return Math.min.apply(Math, args[0]);
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

export function add(a, b) {
  return Number(a) + Number(b);
}

export function sub(a, b) {
  return a - b;
}

export function mul(a, b) {
  return a * b;
}

export function divide(a, b) {
  return a / b;
}

export function mod(a, b) {
  return a % b;
}

export function concat(a, b) {
  if (Array.isArray(a) && Array.isArray(b)) {
    return a.concat(b);
  }
  return '' + a + b;
}

export function equal(a, b) {
  return a === b;
}

export function notEqual(a, b) {
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

export function lessThanEqual(a, b) {
  return a <= b;
}

export function inOperator(a, b) {
  return contains(b, a);
}

export function setVar(name, value, variables) {
  if (variables) variables[name] = value;
  return value;
}
export function arrayIndex(array, index) {
  return array[index | 0];
}

export function condition(cond, yep, nope) {
  return cond ? yep : nope;
}

