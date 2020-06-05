/** @desc 一元运算符 */
export declare const INSTR_OPERA1 = "INSTR_OP1";
/** @desc 二元运算符 */
export declare const INSTR_OPERA2 = "INSTR_OP2";
/** @desc 三元运算符 */
export declare const INSTR_OPERA3 = "INSTR_OP3";
/** @desc 数字 */
export declare const INSTR_NUMBER = "INSTR_NUMBER";
/** @desc 数组字面量 */
export declare const INSTR_ARRAY = "INSTR_ARRAY";
/** @desc 对象字面量 */
export declare const INSTR_OBJECT = "INSTR_OBJECT";
/** @desc 简单类型，表示不用处理 */
export declare const INSTR_PLAIN = "INSTR_PLAIN";
/** @desc 对象成员访问 */
export declare const INSTR_MEMBER = "INSTR_MEMBER";
/** @desc 表达式, 内置表达式 */
export declare const INSTR_EXPRE = "INSTR_EXPRE";
/** @desc 变量类型 const let var */
export declare const INSTR_VAR = "INSTR_VAR";
/** @desc 变量名称, 区别是内声明 TODO: var obj = {} */
export declare const INSTR_VARNAME = "INSTR_VARNAME";
/** @desc 变量名称, 取值, 没有经过声明的名称，例如 undefined, null, 以及数据池中的数据 */
export declare const INSTR_NAME = "INSTR_NAME";
/** @desc 函数调用 */
export declare const INSTR_FUNCALL = "INSTR_FUNCALL";
/** @desc 函数定义指令 */
export declare const INSTR_FUNCDEF = "INSTR_FUNCDEF";
/** @desc 函数执行体 */
export declare const INSTR_EXECUTBODY = "INSTR_EXECUTBODY";
/**
 * @desc 指令实例
 */
export default class Instruction<T extends any> {
    type: string;
    value: T;
    constructor(type: string, value?: any);
}
