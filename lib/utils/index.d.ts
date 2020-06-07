import Instruction from '../instruction';
export declare function isObject(obj: object): obj is object;
/**
 * @export
 * @template T
 * @param {T[]} arr
 * @param {T} value
 * @returns {boolean}
 */
export declare function contains<T extends any>(arr: T[], value: T): boolean;
/**
 * 获取日期时间
 * @export getTime
 * @param {number} [offset=0] 偏移量
 * @returns {string[]} [date, time]
 */
export declare function getTime(offset?: number): string[];
/**
 * 递归foreach
 * @export mapVal
 * @template T
 * @param {T} data
 * @param {Record<string, Record<string, any>>} object
 * @param {(data: T, key:string, val: any) => void} cb
 * @returns
 */
export declare function mapVal<T extends object>(data: T, object: object, cb: (data: T, key: string, val: any) => void): T;
/**
 * 前者为主，仅合并不存在属性
 * @template T object
 * @param {T} target
 * @param {T} source
 */
export declare function merge<T>(target: T, source: T): T;
/**
 * 替换\'\' \"\" 在 处理 in operator 需要到
 * @param {string} str string Field
 * @returns {string} 没有对称引号的字符串
 */
export declare function eliminateQuote(str: string): string;
/**
 * 回文字符串 \'\'a\'\' ✅  \'\'a\'❌
 * @param {string} str
 * @returns
 */
export declare function isPalindrome(str: string): boolean;
/**
 * 返回首个有效数据， 非undefined null false true
 * @param {*} args
 */
export declare function filterUndefine(...args: any[]): any;
export declare function hasAttribute(obj: object, name: string): any;
/**
 * Array to Object e.g. ['a', 'b'] => { a: undefined, b: undefined }
 * @param {string[]} arr
 */
export declare function mapToObject(arr: string[] | Instruction<any>[], defaultValue?: undefined | ((key: string) => any)): any;
export declare function someCondition(...args: any[]): void;