import { contains } from './index';

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

export function lessThanEqual(a, b) {
  return a <= b;
}

export function inTheArr(a, b) {
  return contains(b, a);
}

export function bitWiseOr(a, b) {
  return a ^ b
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