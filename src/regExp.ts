import system from './system';

const supportOperator = ['===', '==', '!==', '!=', ':', '?', '!', '>=', '>', '<=', '<', '+', '-', '*', '/', '|']

export const whitespaceReg = /(\t|\n|\r|\s+)/;
export const booleanReg = /^(false|true)/;
export const commentReg = /^\/\*(.+)\*\//;
export const stringReg = /^((\"(.+)\")|(\'(.+)\'))/
export const number2bitReg = /^(0b[0|1]{1,})/
export const number8bitReg = /^(0[0-8]{1,})/
export const number10bitReg = /^(([0-9]{1,})?(\.\d+)?)/
export const number16bitReg = /^(0x[0-9a-fA-F]{1,})/
export const variableReg = /^((_|$)?[0-9a-zA-Z|$|_]{1,})/
export const operatorReg = new RegExp('^(' + supportOperator.map(r => `\\s*\\${r}\\s*`).join('|') + ')')
export const unaryMapReg = new RegExp(`^(${Object.keys(system.unaryOps).filter(item => /\b\w+\b/.test(item)).join('|')})`)
export const unarySymbolMapReg = new RegExp(`^(${Object.keys(system.unaryOps).filter(item => !(/\b\w+\b/.test(item))).map(r=>`\\s*\\${r}\\s*`).join('|')})`)