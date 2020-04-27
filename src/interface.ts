import Parser from './parser';
import Ceval from './index';
import Token from './token';

export type TypeParser = InstanceType<typeof Parser>

export type TypeCeval = InstanceType<typeof Ceval>

export type TypeToken = InstanceType<typeof Token>