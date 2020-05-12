import Parser from './parser';
import system, { TypeUnary, TypeBinary, TypeTernary, TypeConst, TypeFunction, optionNameMap } from './system';
import TokenStream from './token-stream';
import Instruction from './instruction';
import calculation from './calculation';
import presetVariable from './presetVariable';

interface Options {
  /* @desc 允许使用运算符 */
  endableOperators?: boolean;
  /* @desc 允许启用多位进制Number */
  endableBitNumber?: boolean;
  /* @desc 允许访问成员 */
  allowMemberAccess?: boolean;
}

const defaultOptions = {
  endableOperators: true,
  endableBitNumber: true,
  allowMemberAccess: true
}

export default class Ceval {
  unaryOps: TypeUnary;

  binaryOps: TypeBinary;

  ternaryOps: TypeTernary;
  
  consts: TypeConst;

  functions: TypeFunction;

  constructor(public options: Options = {}){
    Object.assign(defaultOptions, this.options)
    Object.assign(this, system)
  }

  /**
   * 查询支持的操作符方法名称
   * @param ops 操作符
   * @memberof Ceval
   */
  getSupportOperationMap = (ops: string): null | Function => {
    return Object.prototype.hasOwnProperty.call(optionNameMap, ops)? optionNameMap[ops] : null
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
    return result
  }

} 