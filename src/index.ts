import Parser from './parser';
import systemMap, { TypeUnary, TypeBinary, TypeTernary, TypeConst, TypeFunction, optionNameMap } from './systemMap';
import TokenStream from './token-stream';
import Instruction from './instruction';
import calculation from './calculation';
import presetVariable from './utils/presetVariable';
import { merge } from './utils/index';
import { CevalOptions } from './interface';

export default class Ceval {
  unaryOps: TypeUnary;

  binaryOps: TypeBinary;

  ternaryOps: TypeTernary;

  consts: TypeConst;

  functions: TypeFunction;

  constructor(public options: Readonly<CevalOptions> = {}) {
    Object.assign(this, systemMap)
    merge(this.options, new CevalOptions())
  }

  /**
   * 查询支持的操作符方法名称
   * @param ops 操作符
   * @memberof Ceval
   */
  getSupportOperationMap = (ops: string): null | Function => {
    return Object.prototype.hasOwnProperty.call(optionNameMap, ops) ? optionNameMap[ops] : null
  }

  parseString = (expression: string, values = {}) => {
    const instr: Instruction[] = [];

    Parser.generatorParser(this, new TokenStream(this, expression), instr)

    return this.injectValueToCalc(instr, values)
  }

  injectValueToCalc = (tokens: Instruction[], values: object = {}): any => {
    // @TODO 检查敏感字
    // @TODO 检查关键字
    const result = calculation(tokens, Object.assign(presetVariable, values), this)
    return result === undefined ? this.options.defaultReturnValues : result
  }

} 