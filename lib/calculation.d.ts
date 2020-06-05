import Instruction from './instruction';
import Ceval from './index';
/**
 * 运算
 * @export calculation
 * @param {Instruction[]} tokens    TokenQueue
 * @param {object} [values={}]      数据池
 * @param {Ceval} ceval             instance of eval
 * @param {boolean} [statis=false]  true全量返回 默认false
 * @param {object} [scope={}]       作用域
 * @returns result or result[]
 */
export default function calculation(tokens: Instruction<any>[], values: any, ceval: Ceval, statis?: boolean, scope?: any): any;
