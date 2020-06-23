import { CevalOptions } from '../interface';
export declare function add(a: number, b: number, options: CevalOptions): number;
export declare function sub(a: number, b: number, options: CevalOptions): number;
export declare function mul(a: number, b: number, options: CevalOptions): number;
export declare function divide(a: number, b: number, options: CevalOptions): number;
export declare function mod(a: any, b: any): number;
export declare function equal(a: any, b: any): boolean;
export declare function strictEqual(a: any, b: any): boolean;
export declare function notEqual(a: any, b: any): boolean;
export declare function strictNotEqual(a: any, b: any): boolean;
export declare function greaterThan(a: any, b: any): boolean;
export declare function lessThan(a: any, b: any): boolean;
export declare function greaterThanEqual(a: any, b: any): boolean;
export declare function _typeof(a: any): any;
export declare function lessThanEqual(a: any, b: any): boolean;
export declare function inTheTarget(a: any, b: any): any;
export declare function bitWiseOr(a: any, b: any): number;
export declare function setVar(name: string | number, value: any, variables: object | Array<any>): any;
export declare function arrayIndex(array: any, index: any): any;
export declare function condition(cond: any, yep: any, nope: any): any;
export declare function withOr(n1: any, n2: any): any;
export declare function withAlso(n1: any, n2: any): any;
export declare function max(...args: number[]): any;
export declare function min(...args: number[]): any;
export declare function arrayMap(f: (val: any, index?: number) => any, a: any[]): any[];
export declare function random(a: any): number;
