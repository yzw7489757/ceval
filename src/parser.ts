import Ceval from './index';
import { TypeTokenStream } from './interface';

/**
 * 解析器
 * @export
 * @class Parser
 */
export default class Parser {
  
  current = null;

  nextToken = null;

  savedCurrent = null;

  savedNextToken = null;

  constructor(public parser: Ceval,public tokens: TypeTokenStream) {
    this.next();
  }

  next = () => {
    this.current = this.nextToken;
    return (this.nextToken = this.tokens.next());
  }
  
  printLog = (msg: string) => {
    console.log(`%c${msg} `,`margin: 0 .5em;text-decoration-line: underline;text-decoration-color: red;text-decoration-style: wavy;line-height: 2em;color: red;`)
  }
}