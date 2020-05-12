import Parser from './parser';
import Ceval from './index';
import Token from './token';
import TokenStream from './token-stream';
import Instruction from './instruction';

export type TypeParser = InstanceType<typeof Parser>

export type TypeCeval = InstanceType<typeof Ceval>

export type TypeToken = InstanceType<typeof Token>

export type TypeTokenStream = InstanceType<typeof TokenStream>

export type TypeInstruction = InstanceType<typeof Instruction>

export type KeyOfValType<T extends object> = T[keyof T];