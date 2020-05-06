import Ceval from './index';
import { TypeTokenStream, TypeToken } from './interface';
import Instruction, { INSTR_EXPRE, INSTR_FUNCALL, INSTR_OPERA3, INSTR_ARRAY, INSTR_NUMBER, INSTR_VAR  } from './instruction';
import { TOKEN_OPERATOR, TOKEN_NAME, TOKEN_SQUARE, TOKEN_PAREN, TOKEN_NUMBER, TOKEN_STRING, TOKEN_COMMA } from './token';

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

  constructor(public parser: Ceval, public tokens: TypeTokenStream) {
    this.next();
  }

  next = () => {
    this.current = this.nextToken;
    return (this.nextToken = this.tokens.next());
  }

  /**
   * @argument type 约定的类型
   * @argument value 明确规定的字面值，比如 [ ] , =
   * @memberof Parser
   */
  accept = (type: string, value?) => {
    if (this.nextToken && type === this.nextToken.type) {
      if (value !== undefined && value !== this.nextToken.value) {
        return false // 明确
      }
      this.next()
      return true
    }
    return false
  }

  expect = (type: string, value?) => {
    if (!this.accept(type, value)) {
      throw new Error('Unexpected resolution');
    }
  }

  parseExpression = (instr: Instruction[]) => {
    const exprInstr: Instruction[] = []
    this.parseMultipleEvaluation(exprInstr)

    exprInstr.forEach(exp => (instr.push(exp)))
  }

  parseMultipleEvaluation = (exprInstr: Instruction[]): void => {
    this.parseAssignmentExpression(exprInstr)

    while (this.accept(TOKEN_OPERATOR, ',')) {
      // 
    }
  }

  /**
   * 解析变量赋值表达式 TOKEN_OPERATOR =
   * @memberof Parser
   */
  parseAssignmentExpression = (exprInstr: Instruction[]): void => {
    this.parseConditionalExpression(exprInstr)

    while (this.accept(TOKEN_OPERATOR, '=')) {
      // this.parseExpression()
    }
  }

  /**
   * 解析三目运算符
   * @memberof Parser
   */
  parseConditionalExpression = (exprInstr: Instruction[]): void => {
    this.parseOrExpression(exprInstr)
    while (this.accept(TOKEN_OPERATOR, '?')) {
      const trueBranch = [];
      const falseBranch = [];
      this.parseConditionalExpression(trueBranch);
      this.expect(TOKEN_OPERATOR, ':');
      this.parseConditionalExpression(falseBranch);
      exprInstr.push(new Instruction(INSTR_EXPRE, trueBranch));
      exprInstr.push(new Instruction(INSTR_EXPRE, falseBranch));
      exprInstr.push(new Instruction(INSTR_OPERA3, '?'));
    }
  }

  /**
   * 解析 ||
   * @memberof Parser
   */
  parseOrExpression = (exprInstr: Instruction[]): void => {
    this.parseAndExpression(exprInstr)
    // 
  }

  /**
   * 解析 &&
   * @memberof Parser
   */
  parseAndExpression = (exprInstr: Instruction[]): void => {
    this.parseBitwiseOrExpression(exprInstr)
    // 
  }

  /**
   * 解析 ^ 按位异或
   * @memberof Parser
   */
  parseBitwiseOrExpression = (exprInstr: Instruction[]): void => {
    this.parseBitwiseAndExpression(exprInstr)
    // 
  }

  /**
   * 解析 & 按位与
   * @memberof Parser
   */
  parseBitwiseAndExpression = (exprInstr: Instruction[]): void => {
    this.parseEqualExpression(exprInstr)
    // 
  }

  /**
   * 解析判等 ['==', '===', '!=', '!==']
   * @memberof Parser
   */
  parseEqualExpression = (exprInstr: Instruction[]): void => {
    this.parseCompareExpression(exprInstr)
    // 
  }

  /**
   * 解析比较运算符 ['<', '<=', '>=', '>','in']
   * @memberof Parser
   */
  parseCompareExpression = (exprInstr: Instruction[]): void => {
    this.parseBitwiseMoveExpression(exprInstr)
    // 
  }

  /**
   * 解析按位移 [">>", ">>>", "<<"]
   * @memberof Parser
   */
  parseBitwiseMoveExpression = (exprInstr: Instruction[]): void => {
    this.parseAddOrSubExpression(exprInstr)
    // 
  }
  
  /**
   * 解析加减法 + -
   * @memberof Parser
   */
  parseAddOrSubExpression = (exprInstr: Instruction[]): void => {
    this.parseMulOrDivExpression(exprInstr)
    // 
  }

  /**
   * 解析乘除取模 * / %
   * @memberof Parser
   */
  parseMulOrDivExpression = (exprInstr: Instruction[]): void => {
    this.parseUnaryExpression(exprInstr)
    // 
  }

  /**
   * 解析一元运算符 [+, ++, +, -, !, ~]
   * @memberof Parser
   */
  parseUnaryExpression = (exprInstr: Instruction[]): void => {
    this.parseMemberAccessExpression(exprInstr)
    
    // 
  }

  /**
   * 解析函数调用
   * @memberof Parser
   */
  parseFuncCallExpression = (exprInstr: Instruction[]): void => {
    if(this.accept(TOKEN_PAREN, '(')) {
      if(this.accept(TOKEN_PAREN, ')')) {
        // 立即调用
        exprInstr.push(new Instruction(INSTR_FUNCALL, 0)) // 参数长度 
      } else {
        let count = 0
        while(!this.accept(TOKEN_PAREN, ')')) {
          this.parseExpression(exprInstr);
          count++
          while (this.accept(TOKEN_COMMA)) {
            this.parseExpression(exprInstr);
            count++;
          }
        }
        exprInstr.push(new Instruction(INSTR_FUNCALL, count))
      }
    }
    // 
  }

  /**
   * 解析成员访问符 . []
   * @memberof Parser
   */
  parseMemberAccessExpression = (exprInstr: Instruction[]): void => {
    console.log(this.nextToken)
    if (this.accept(TOKEN_NAME) || this.accept(TOKEN_OPERATOR)) {
      // 属于变量名称(单词)或者当前token.type 属于前缀运算 cos tan - +
      exprInstr.push(new Instruction(INSTR_VAR, this.current.value));
    } else if (this.accept(TOKEN_NUMBER)) {
      // 数字类型
      exprInstr.push(new Instruction(INSTR_NUMBER, this.current.value));
    } else if (this.accept(TOKEN_STRING)) {
      // 字符串类型 \"name\"
      exprInstr.push(new Instruction(INSTR_NUMBER, this.current.value));
    } else if (this.accept(TOKEN_PAREN, '(')) {
      // 圆括号，调用或者表达式(a=1)都存在
      this.parseExpression(exprInstr);
      this.expect(TOKEN_PAREN, ')');
    } else {
      throw new Error('unexpected ' + this.nextToken);
    }
  }

  printLog = (msg: string) => {
    console.log(`%c${msg} `, `margin: 0 .5em;text-decoration-line: underline;text-decoration-color: red;text-decoration-style: wavy;line-height: 2em;color: red;`)
  }
}