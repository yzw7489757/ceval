import Ceval from './index';
import { TypeTokenStream, TypeToken } from './interface';
import Instruction, { INSTR_EXPRE, INSTR_FUNCALL, INSTR_OPERA1, INSTR_MEMBER, INSTR_OPERA2, INSTR_OPERA3, INSTR_ARRAY, INSTR_NUMBER, INSTR_VAR  } from './instruction';
import { TOKEN_OPERATOR, TOKEN_NAME, TOKEN_SQUARE, TOKEN_PAREN, TOKEN_NUMBER, TOKEN_STRING, TOKEN_COMMA, TOKEN_SEMICOLON, TOKEN_END } from './token';
import { unarySymbolMapReg, unaryMapReg } from './regExp';

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

  constructor(public parser: Ceval, public tokens: TypeTokenStream, exprInstr: Instruction[]) {
    this.next();
    this.parseExpression(exprInstr)
  }

  static generatorParser = (parser: Ceval, tokens: TypeTokenStream, exprInstr: Instruction[]) => {
    return new Parser(parser, tokens, exprInstr)
  }

  next = () => {
    this.current = this.nextToken;
    this.nextToken = this.tokens.next()
    return this.nextToken
  }

  matchToken = (value: undefined | ((value: TypeToken) => boolean) | string | number): boolean => {
    if (value === undefined) {
      return true
    } else if (Array.isArray(value)){
      return value.indexOf(this.nextToken.value) !== -1
    } else if(typeof value === 'function') {
      return value(this.nextToken)
    } else if(typeof value === 'string' || typeof value === 'number') {
      return value === this.nextToken.value
    } else {
      return false
    }
  }

  /**
   * @argument type 约定的类型
   * @argument value 明确规定的字面值，比如 [ ] , =
   * @argument next 允许next？
   * @memberof Parser
   */
  accept = (type: string, value?, next = true) => {
    if (this.nextToken && (this.nextToken.type === type) && this.matchToken(value)) {
      if(next) this.next()
      return true
    }
    return false
  }

  expect = (type: string, value?) => {
    if (!this.accept(type, value)) {
      throw new Error('Unexpected resolution');
    }
  }

  temporarySaved = () => {
    this.savedCurrent = this.current;
    this.savedNextToken = this.nextToken;

    this.tokens.temporarySaved()
  }

  restore = () => {
    this.current = this.savedCurrent;
    this.nextToken = this.savedNextToken;
    this.tokens.restore()
  }

  parseExpression = (instr: Instruction[]) => {
    const exprInstr: Instruction[] = []
    this.parseAssignmentExpression(exprInstr)

    exprInstr.forEach(exp => (instr.push(exp)))
  }

  // parseMultipleEvaluation = (exprInstr: Instruction[]): void => {
  //   this.parseAssignmentExpression(exprInstr)

  //   while (this.accept(TOKEN_OPERATOR, ',')) {
  //     // 
  //   }
  // }

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
    while(this.accept(TOKEN_OPERATOR, '||')) {
      var branch = []
      this.parseAndExpression(branch)
      exprInstr.push(new Instruction(INSTR_EXPRE, branch))
      exprInstr.push(new Instruction(INSTR_OPERA2, '||'))
    } 
  }

  /**
   * 解析 &&
   * @memberof Parser
   */
  parseAndExpression = (exprInstr: Instruction[]): void => {
    this.parseEqualExpression(exprInstr)
    while(this.accept(TOKEN_OPERATOR, '&&')) {
      var branch = []
      this.parseEqualExpression(branch)
      exprInstr.push(new Instruction(INSTR_EXPRE, branch))
      exprInstr.push(new Instruction(INSTR_OPERA2, '&&'))
    }
  }

  /**
   * 解析判等 ['==', '===', '!=', '!==']
   * @memberof Parser
   */
  parseEqualExpression = (exprInstr: Instruction[]): void => {
    this.parseCompareExpression(exprInstr)
    while(this.accept(TOKEN_OPERATOR, ['==', '===', '!=', '!=='])) {
      var op = this.current
      this.parseCompareExpression(exprInstr)
      exprInstr.push(new Instruction(INSTR_OPERA2, op.value))
    }
  }

  /**
   * 解析比较运算符 ['<', '<=', '>=', '>']
   * @memberof Parser
   */
  parseCompareExpression = (exprInstr: Instruction[]): void => {
    this.parseBitwiseMoveExpression(exprInstr)
    while(this.accept(TOKEN_OPERATOR, ['<', '<=', '>=', '>'])) {
      var op = this.current
      this.parseBitwiseMoveExpression(exprInstr)
      exprInstr.push(new Instruction(INSTR_OPERA2, op.value))
    }
  }

  /**
   * 解析按位移 [">>", ">>>", "<<"]
   * @memberof Parser
   */
  parseBitwiseMoveExpression = (exprInstr: Instruction[]): void => {
    this.parseAddOrSubExpression(exprInstr)
    while(this.accept(TOKEN_OPERATOR, [">>", ">>>", "<<"])) {
      var op = this.current
      this.parseAddOrSubExpression(exprInstr)
      exprInstr.push(new Instruction(INSTR_OPERA2, op.value))
    }
  }
  
  /**
   * 解析加减法 + -
   * @memberof Parser
   */
  parseAddOrSubExpression = (exprInstr: Instruction[]): void => {
    this.parseMulOrDivExpression(exprInstr)
    while(this.accept(TOKEN_OPERATOR, ["+", "-"])) {
        var op = this.current
        this.parseMulOrDivExpression(exprInstr)
        exprInstr.push(new Instruction(INSTR_OPERA2, op.value))
    }
  }

  /**
   * 解析乘除取模 * / %
   * @memberof Parser
   */
  parseMulOrDivExpression = (exprInstr: Instruction[]): void => {
    this.parseUnaryExpression(exprInstr)
    while(this.accept(TOKEN_OPERATOR, ["*", "/", "%"])) {
      var op = this.current
      this.parseUnaryExpression(exprInstr)
      exprInstr.push(new Instruction(INSTR_OPERA2, op.value))
    }
  }

  /**
   * 解析一元运算符 [+, ++, +, -, !, ~, cos, tan, typeof]
   * @memberof Parser
   */
  parseUnaryExpression = (exprInstr: Instruction[]): void => {
    this.temporarySaved();
    if(this.accept(TOKEN_OPERATOR,({ value }) => value in this.parser.unaryOps)){
        if(unarySymbolMapReg.test(this.current.value)){ // +, ++, +, -, !, ~,
          const op = this.current
          this.parseUnaryExpression(exprInstr); // 兼容 ++-1
          exprInstr.push(new Instruction(INSTR_OPERA1, op.value))
        } else if(this.accept(TOKEN_PAREN, '(', false)) { // typeof(
          this.restore()
          this.parseBitwiseOrExpression(exprInstr)
        } else if (
          [TOKEN_COMMA, TOKEN_SEMICOLON, TOKEN_END].indexOf(this.nextToken.type) !== -1 || // typeof, typeof; typeof
          (this.nextToken.type === TOKEN_PAREN && this.nextToken.value === ')') // typeof)
        ) {
          this.restore(); 
          this.parseField(exprInstr);
        }
    }else{
      this.parseField(exprInstr)
    }
  }

  /**
   * 解析 ^ 按位异或
   * @memberof Parser
   */
  parseBitwiseOrExpression = (exprInstr: Instruction[]): void => {
    this.parseBitwiseAndExpression(exprInstr)
    while(this.accept(TOKEN_OPERATOR, '^')) {
      this.parseUnaryExpression(exprInstr)
      exprInstr.push(new Instruction(INSTR_OPERA2, '^'))
    }
  }

  /**
   * 解析 & 按位与
   * @memberof Parser
   */
  parseBitwiseAndExpression = (exprInstr: Instruction[]): void => {
    this.parseFuncCallExpression(exprInstr)
    while(this.accept(TOKEN_OPERATOR, '&')) {
      this.parseUnaryExpression(exprInstr)
      exprInstr.push(new Instruction(INSTR_OPERA2, '&'))
    }
  }

  /**
   * 解析函数调用
   * @memberof Parser
   */
  parseFuncCallExpression = (exprInstr: Instruction[]): void => {
    if(this.accept(TOKEN_OPERATOR, ({ value }) => unaryMapReg.test(value))) {
      var op = this.current
      this.parseField(exprInstr)
      exprInstr.push(new Instruction(INSTR_OPERA1, op.value))
    }else {
      this.parseMemberAccessExpression(exprInstr); // a.b()
      while(this.accept(TOKEN_PAREN, '(')) {
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
    }
  }

  /**
   * 解析成员访问符 . []
   * @memberof Parser
   */
  parseMemberAccessExpression = (exprInstr: Instruction[]): void => {
    this.parseField(exprInstr);
    while(this.accept(TOKEN_OPERATOR, '.') || this.accept(TOKEN_SQUARE, '[')) {
      if(this.current.value === '.') {
        this.expect(TOKEN_NAME); // a.name ✔️  a.1×
        exprInstr.push(new Instruction(INSTR_MEMBER, this.current.value))
      } else if (this.current.value === '[') {
        this.parseExpression(exprInstr);
        this.expect(TOKEN_SQUARE, ']')
        exprInstr.push(new Instruction(INSTR_OPERA2))
      }
    }
  }

  parseField = (exprInstr: Instruction[]): void => {
    if (this.accept(TOKEN_NAME) || this.accept(TOKEN_OPERATOR, ({ value }) => unaryMapReg.test(value))) {
      // 属于变量名称(单词)或者当前token.type 属于前缀运算 cos tan - +
      exprInstr.push(new Instruction(INSTR_VAR, this.current.value));
    } else if (this.accept(TOKEN_NUMBER)) {
      // 数字类型
      exprInstr.push(new Instruction(INSTR_NUMBER, this.current.value));
    } else if (this.accept(TOKEN_STRING)) {
      // 字符串类型 \"name\"
      exprInstr.push(new Instruction(INSTR_NUMBER, this.current.value));
    } else if (this.accept(TOKEN_PAREN, '(')) {
      // 圆括号，调用 或 表达式(a=1)
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