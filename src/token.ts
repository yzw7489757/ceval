/** @desc 结束标记 */
export const TOKEN_END = 'TOKEN_END';
/** @desc 操作符类型 */
export const TOKEN_OPERATOR = 'TOKEN_OP';
/** @desc 数字类型 */
export const TOKEN_NUMBER = 'TOKEN_NUMBER';
/** @desc 字符串类型 */
export const TOKEN_STRING = 'TOKEN_STRING';
/** @desc 圆括号，调用 */
export const TOKEN_PAREN = 'TOKEN_PAREN';
/** @desc 方括号，成员访问 [] */
export const TOKEN_SQUARE = 'TOKEN_SQUARE';
/** @desc 逗号 , */
export const TOKEN_COMMA = 'TOKEN_COMMA';
/** @desc 变量 , */
export const TOKEN_VAR = 'TOKEN_VAR';
/** @desc 变量名称 */
export const TOKEN_NAME = 'TOKEN_NAME';
/** @desc 结束标记; */
export const TOKEN_SEMICOLON = 'TOKEN_SEMICOLON';

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

