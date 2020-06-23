import { random, min, max, arrayMap as map, add, sub, mul, divide, mod, withOr, withAlso, equal, notEqual, greaterThan, lessThan, greaterThanEqual, lessThanEqual, inTheTarget, setVar, arrayIndex, bitWiseOr, strictNotEqual, condition, strictEqual } from './utils/functions';
declare const system: {
    functions: {
        random: typeof random;
        min: typeof min;
        max: typeof max;
        map: typeof map;
        pow: (x: number, y: number) => number;
    };
    consts: {
        E: number;
        PI: number;
        true: boolean;
        false: boolean;
        undefined: any;
        null: any;
        NaN: number;
        Infinity: number;
    };
    binaryOps: {
        '+': typeof add;
        '-': typeof sub;
        '*': typeof mul;
        '/': typeof divide;
        '%': typeof mod;
        '^': typeof bitWiseOr;
        '||': typeof withOr;
        '&&': typeof withAlso;
        '==': typeof equal;
        '!=': typeof notEqual;
        '!==': typeof strictNotEqual;
        '>': typeof greaterThan;
        '<': typeof lessThan;
        '>=': typeof greaterThanEqual;
        '<=': typeof lessThanEqual;
        '=': typeof setVar;
        '[': typeof arrayIndex;
        '===': typeof strictEqual;
        in: typeof inTheTarget;
    };
    ternaryOps: {
        '?': typeof condition;
    };
    unaryOps: {
        '+': (v: any) => number;
        '-': (v: any) => number;
        '!': (v: any) => boolean;
        '~': (v: any) => number;
        '++': (v: any) => number;
        '--': (v: any) => number;
        typeof: (v: any) => string;
        return: (v: any) => any;
        sin: (x: number) => number;
        cos: (x: number) => number;
        tan: (x: number) => number;
    };
    syntaxOperator: {
        ':': any;
        '.': any;
    };
};
export default system;
/** @desc 功能函数 */
export declare type TypeFunction = typeof system.functions;
/** @desc 常量设置 */
export declare type TypeConst = typeof system.consts;
/** @desc 一元运算符 */
export declare type TypeUnary = typeof system.unaryOps;
/** @desc 二元运算符 */
export declare type TypeBinary = typeof system.binaryOps;
/** @desc 三元运算符 */
export declare type TypeTernary = typeof system.ternaryOps;
/** @desc 词法操作符 */
export declare type TypeSyntax = typeof system.syntaxOperator;
/** @desc 运算符映射表 */
export declare const operatorMap: any;
