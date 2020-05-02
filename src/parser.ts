import Ceval from './index';
import { TypeTokenStream, TypeToken } from './interface';
import Instruction from './instruction';

/**
 * 解析器
 * @export
 * @class Parser
 */
export default class Parser {
  
  current: Instruction = null;

  savedCurrent: Instruction = null;

  nextToken: TypeToken = null;

  savedNextToken: TypeToken = null;

  constructor(public parser: Ceval,public tokens: TypeTokenStream) {
    this.next();
  }

  next = () => {
    this.current = this.nextToken;
    return (this.nextToken = this.tokens.next());
  }

  accept = (type: string, value?) => {
    if(this.nextToken && type === this.nextToken.type){
      this.next()
      return true
    }
    return false
  }
  
  expect = (value) => {
    if(!this.accept){
      throw new Error('Unexpected resolution');
    }
  }

  parseExpression = (instr: []) => {
    const exprInstr = []
    this.parseMultipleEvaluation(exprInstr)
  }

  parseMultipleEvaluation = (exprInstr: Instruction[]): void => {
    this.parseAssignmentExpression(exprInstr)

    while(this.accept('=')) {
      // this.parseExpression()
    }
  }

  parseAssignmentExpression = (exprInstr: Instruction[]): void => {

  }

  printLog = (msg: string) => {
    console.log(`%c${msg} `,`margin: 0 .5em;text-decoration-line: underline;text-decoration-color: red;text-decoration-style: wavy;line-height: 2em;color: red;`)
  }
}