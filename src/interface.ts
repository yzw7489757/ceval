import Parser from './parser';
import Ceval from './index';
import Token from './token';
import TokenStream from './token-stream';

export type TypeParser = InstanceType<typeof Parser>

export type TypeCeval = InstanceType<typeof Ceval>

export type TypeToken = InstanceType<typeof Token>

export type TypeTokenStream = InstanceType<typeof TokenStream>