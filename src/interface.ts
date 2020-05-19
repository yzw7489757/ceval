import Parser from './parser';
import Ceval from './index';
import Token from './token';
import TokenStream from './token-stream';
import Instruction from './instruction';

export type TypeParser = InstanceType<typeof Parser>

export type TypeCeval = InstanceType<typeof Ceval>

export type TypeToken = InstanceType<typeof Token>

export type TypeTokenStream = InstanceType<typeof TokenStream>

export type TypeInstruction = Instruction<any>

export type KeyOfValType<T extends object> = T[keyof T];

export class CevalOptions {
  /**
   * @desc 允许使用运算符
   * @requires false
   * @todo TODO: 做控制
   * @type {boolean}
   */
  endableOperators?: boolean = true;

  /**
   * @desc 允许启用多位进制Number
   * @requires false
   * @todo TODO: 做控制
   * @type {boolean}
   */
  endableBitNumber?: boolean = true;

  /**
   * @desc 允许访问成员
   * @requires false
   * @todo TODO: 做控制
   * @type {boolean}
   */
  allowMemberAccess?: boolean = true;

  /**
   * @desc 当没有返回值或为undefined时触发默认返回值
   * @requires false
   * @todo done
   * @type {any}
   */
  defaultReturnValues?: any = '' // done
}