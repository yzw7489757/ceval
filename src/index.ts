import Parser from './parser';
import system, { TypeUnary, TypeBinary, TypeTernary, TypeConst, TypeFunction } from './system';
import TokenStream from './token-stream';

interface Options {
  operators?: any;
  allowMemberAccess?: boolean;
}

export default class Ceval {
  unaryOps: TypeUnary;

  binaryOps: TypeBinary;

  ternaryOps: TypeTernary;
  
  consts: TypeConst;

  functions: TypeFunction;

  constructor(public options: Options){
    Object.assign(this, system)
  }

  parser = (expression: string) => {
    const instr = [];
    const token = new TokenStream(this, expression);


  }

} 