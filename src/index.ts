import Parser from './parser';
import system, { TypeUnary, TypeBinary, TypeTernary, TypeConst, TypeFunction, optionNameMap } from './system';
import TokenStream from './token-stream';
import Instruction from './instruction';
import calculation from './calculation';

interface Options {
  operators?: any;
  allowMemberAccess?: boolean;
}

export default class Ceval {
  unaryOps: TypeUnary;

  binaryOps: TypeBinary;

  ternaryOps: TypeTernary;
  
  consts: TypeConst;

  functions: TypeFunction;

  constructor(public options: Options = {}){
    Object.assign(this, system)
  }

  /**
   * 查询支持的操作符方法名称
   * @memberof Ceval
   */
  getSupportOperationMap = (ops: string) => {
    return Object.prototype.hasOwnProperty.call(optionNameMap, ops)? optionNameMap[ops] : null
  } 

  parseString = (expression: string, values = {}) => {
    const instr: Instruction[] = [];
    const tokens = new TokenStream(this, expression);

    const parser = new Parser(this, tokens)

    parser.parseExpression(instr)

    return this.injectValueToCalc(instr, values)
  }

  injectValueToCalc = (tokens: Instruction[], values: object = {}): any => {
    const presetVal = {}
    // @TODO 检查敏感字
    // @TODO 检查关键字
    const result = calculation(tokens, Object.assign(presetVal, values), this)
    return result
  }

} 