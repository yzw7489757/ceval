import system from '../systemMap';
import { contains } from './index';

const BLACK_LIST_OPERATORS = []
const supportOperator = Array.from(new Set(
  [].concat(
    Object.keys(system.unaryOps).filter(item => !/\b\w+\b/.test(item)),
    Object.keys(system.binaryOps),
    Object.keys(system.ternaryOps),
    Object.keys(system.syntaxOperator)
  )
    .filter(op => !contains(BLACK_LIST_OPERATORS, op))
    .sort((a, b) => b.length - a.length)
))

export const whitespaceReg = /(\t|\n|\r|\s+)/;
export const booleanReg = /^(false|true)/;
export const commentReg = /^\/\*(.*?)\*\//;
export const stringReg = /^\'(.*?)\'|^\"(.*?)\"/;
export const stringGreedyReg = /^\'(.*)\'|^\"(.*)\"/;
// export const regExpReg = /^ExecReg\((.*)\)/;

export const number2bitReg = /^(0b[0|1]{1,})$/;
export const number8bitReg = /^(0[0-7]{1,})$/;
export const number010bitReg = /^(0\d*[8-9]{1,}\d*(\.\d+)?)$/; // 0开头的十进制 019 038 078
export const number10bitReg = /(^([1-9]\d*(\.\d+)|(\d*(\.\d+)?)))/; // 1-9 或者.开头的十进制
export const number16bitReg = /^(0x[0-9a-fA-F]{1,})$/;

export const variableReg = /^((_|$)?[0-9a-zA-Z|$|_]{1,})/;
export const operatorReg = new RegExp(`^(${supportOperator.map(r => `(\\${/\b\w+\b/.test(r) ? r : r.split('').join('\\')})`).join('|')})`);
export const unaryMapReg = new RegExp(`^(${Object.keys(system.unaryOps).filter(item => /\b\w+\b/.test(item)).join('|')})`);
export const unarySymbolMapReg = new RegExp(`^(${Object.keys(system.unaryOps).filter(item => !(/\b\w+\b/.test(item))).map(r => `\\s*\\${r}\\s*`).join('|')})`);

export const execNumberReg = (reg: RegExp, expr: string, cb: <T>(v: T) => T = (v => v)): string | undefined => {
  reg.lastIndex = 0;
  const result = reg.exec(expr);
  if (result === null || result[0] === '') {
    return cb(undefined)
  } else {
    return cb(result[1])
  }
}

export const isUnaryOpeator = ({ value }) => Object.prototype.hasOwnProperty.call(system.unaryOps, value)
export const isBinaryOpeator = ({ value }) => Object.prototype.hasOwnProperty.call(system.binaryOps, value)
export const isTernaryOpeator = ({ value }) => Object.prototype.hasOwnProperty.call(system.ternaryOps, value)