import Parser from './parser';
import systemMap, { TypeUnary, TypeBinary, TypeTernary, TypeConst, TypeFunction, optionNameMap } from './systemMap';
import TokenStream from './token-stream';
import calculation from './calculation';
import presetVariable from './utils/presetVariable';
import { merge } from './utils/index';
import { CevalOptions, TypeInstruction } from './interface';

export default class Ceval {
  unaryOps: TypeUnary;

  binaryOps: TypeBinary;

  ternaryOps: TypeTernary;

  consts: TypeConst;

  functions: TypeFunction;

  private currentValues: Record<string, any> = {};

  constructor(public options: Readonly<CevalOptions> = {}) {
    Object.assign(this, systemMap);
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

  /**
   * 解析字符串，对外暴露方法
   * @memberof Ceval
   */
  parseString = (expression: string, values: Record<string, any> = {}) => {
    const instr: TypeInstruction[] = [];

    Parser.generatorParser(this, new TokenStream(this, expression), instr)

    return this.injectValueToCalc(instr, values)
  }

  /**
   * 获取当前数据池 预置+外置+内声明
   * @returns 数据池
   * @memberof Ceval
   */
  getCurrentValues = (): Record<string, any> => this.currentValues;

  /**
   * 传入指令集开始计算
   * @param {tokens} Instruction[] 指令集
   * @param {Record<string, any>} [values={}] 数据池
   * @memberof Ceval
   */
  injectValueToCalc = (tokens: TypeInstruction[], values: Record<string, any> = {}): any => {
    // @TODO 检查敏感字
    // @TODO 检查关键字
    this.currentValues = Object.assign(presetVariable, values)
    const result = calculation(tokens, this.currentValues, this)
    return result === undefined ? this.options.defaultReturnValues : result
  }

  /**
   * Update Option
   * @param {Options} CevalOptions 配置
   * @memberof Ceval
   */
  updateOptions = (Options: Partial<CevalOptions>): void => {
    Object.assign(this.options, Options)
  }

} 