/** @desc 数字类型 */
export const INSTR_NUMBER = 'INSTR_NUMBER';
/** @desc 一元运算符类型 */
export const INSTR_OPERA1 = 'INSTR_OP1';
/** @desc 二元运算符类型 */
export const INSTR_OPERA2 = 'INSTR_OP2';
/** @desc 三元运算符类型 */
export const INSTR_OPERA3 = 'INSTR_OP3';
/** @desc 变量类型 */
export const INSTR_VAR = 'INSTR_VAR';
/** @desc 变量名称类型 */
export const INSTR_VARNAME = 'INSTR_VARNAME';
/** @desc 函数调用 */
export const INSTR_FUNCALL = 'INSTR_FUNCALL';
/** @desc 对象成员访问 */
export const INSTR_MEMBER = 'INSTR_MEMBER';
/** @desc 函数定义类型 */
export const INSTR_FUNDEF = 'INSTR_FUNDEF';
/** @desc 数组字面量类型 */
export const INSTR_ARRAY = 'INSTR_ARRAY';
/** @desc 表达式类型 */
export const INSTR_EXPRE = 'INSTR_EXPRE';


/**
 * @desc 指令实例
 */
export default class Instruction {

  value: number | string | object | any[];

  constructor(public type: string, value?: any){
    this.value = (value !== undefined && value !== null) ? value : 0;
  }
}
