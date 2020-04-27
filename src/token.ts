/** @desc 结束标记 */
export const END = 'END';
/** @desc 有效类型 */
export const TOP = 'TOP';
/** @desc 数字类型 */
export const TNUMBER = 'TNUMBER';
/** @desc 字符串类型 */
export const TSTRING = 'TSTRING';
/** @desc 圆括号，调用 */
export const TPAREN = 'TPAREN';
/** @desc 方括号，成员访问 [] */
export const TBRACKET = 'TBRACKET';
/** @desc 逗号 , */
export const TCOMMA = 'TCOMMA';
/** @desc 变量名称 */
export const TNAME = 'TNAME';
/** @desc 结束标记; */
export const TSEMICOLON = 'TSEMICOLON';

/**
 * tokenStream 解析阶段指令
 * @export 
 * @class Token
 */
export default class Token {
  constructor(public type: string, public value: any, public index: number) {
    if((window as any)._debug){
      console.log(`type: ${type}; value: ${value}; index: ${index}`)
    }
  }

  toString = () => {
    return this.type + ': ' + this.value;
  };
}

