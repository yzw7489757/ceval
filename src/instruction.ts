/** @desc 数字类型 */
export const INUMBER = 'INUMBER';
/** @desc 一元运算符类型 */
export const IOP1 = 'IOP1';
/** @desc 二元运算符类型 */
export const IOP2 = 'IOP2';
/** @desc 三元运算符类型 */
export const IOP3 = 'IOP3';
/** @desc 变量类型 */
export const IVAR = 'IVAR';
/** @desc 变量名称类型 */
export const IVARNAME = 'IVARNAME';
/** @desc 函数调用 */
export const IFUNCALL = 'IFUNCALL';
/** @desc 对象成员访问 */
export const IMEMBER = 'IMEMBER';
/** @desc 函数定义类型 */
export const IFUNDEF = 'IFUNDEF';
/** @desc 数组字面量类型 */
export const IARRAY = 'IARRAY';

/**
 * @desc 指令实例
 */
export default class Instruction {

  value: any;

  type: string;

  constructor(type: string, value?: any){
    this.type = type;
    this.value = (value !== undefined && value !== null) ? value : 0;
  }
}
