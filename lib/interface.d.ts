import Parser from './parser';
import Ceval from './index';
import Token from './token';
import TokenStream from './token-stream';
import Instruction from './instruction';
export declare type TypeParser = InstanceType<typeof Parser>;
export declare type TypeCeval = InstanceType<typeof Ceval>;
export declare type TypeToken = InstanceType<typeof Token>;
export declare type TypeTokenStream = InstanceType<typeof TokenStream>;
export declare type TypeInstruction = Instruction<any>;
export declare type KeyOfValType<T extends object> = T[keyof T];
export declare class CevalOptions {
    /**
     * @desc 允许使用运算符
     * @requires false
     * @todo TODO: 做控制
     * @type {boolean}
     */
    endableOperators?: boolean;
    /**
     * @desc 允许启用多位进制Number
     * @requires false
     * @todo TODO: 做控制
     * @type {boolean}
     */
    endableBitNumber?: boolean;
    /**
     * @desc 允许访问成员
     * @requires false
     * @todo TODO: 做控制
     * @type {boolean}
     */
    allowMemberAccess?: boolean;
    /**
     * @desc 允许默认放大计算，以处理四则运算的结果 e.g 0.1+0.2 !== 0.3  || 1.0-0.9 !== 0.1
     * 在超出边界的情况下（ta > Number.MAX_SAFE_INTEGER || ta < Number.MIN_SAFE_INTEGER）会不做处理，还原四则运算
     * @requires false
     * @type {boolean}
     */
    allowHandleNumberPrecision?: boolean;
    /**
     * @desc 默认不允许操作符被 presetValue 覆盖
     * @see 某些情况下开发者想制定更加精确的计算,例如BigInt,那么就在根据operatorMap声明presetValue={'+':Function}
     * @requires false
     * @type {boolean}
     * @memberof CevalOptions
     */
    allowOperatorsCovered?: boolean;
    /**
     * @desc 当没有返回值或为undefined时触发默认返回值
     * @requires false
     * @todo done
     * @type {any}
     */
    defaultReturnValues?: any;
}
