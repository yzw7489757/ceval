import Ceval from './index';
import { TypeTokenStream, TypeToken } from './interface';
import Instruction, { INSTR_EXPRE, INSTR_FUNCALL, INSTR_OBJECT, INSTR_OPERA1, INSTR_MEMBER, INSTR_OPERA2, INSTR_OPERA3, INSTR_ARRAY, INSTR_NUMBER, INSTR_VAR } from './instruction';
import { TOKEN_OPERATOR, TOKEN_NAME, TOKEN_SQUARE, TOKEN_PAREN, TOKEN_NUMBER, TOKEN_STRING, TOKEN_COMMA, TOKEN_SEMICOLON, TOKEN_END, TOKEN_CURLY, TOKEN_VAR } from './token';
import { unarySymbolMapReg, isUnaryOpeator } from './utils/regExp';

/**
 * 解析器
 * @export
 * @class Parser
 */
export default class Parser {
  /**
   * @desc 当前TOKEN指针
   */
  current: Instruction | null = null;

  /**
   * @desc 暂存指针
   */
  savedCurrent: Instruction | null = null;

  /**
   * @desc 下个TOKEN指针对象
   */
  nextToken: TypeToken | null = null;

  /**
   * @desc 暂存next TOKEN
   */
  savedNextToken: TypeToken | null = null;

  constructor(public parser: Ceval, public tokens: TypeTokenStream, exprInstr: Instruction[]) {
    this.next();
    this.parseExpression(exprInstr)
  }

  /**
   * 生成实例解析表达式，简化调用方式
   * @memberof Parser
   */
  static generatorParser = (parser: Ceval, tokens: TypeTokenStream, exprInstr: Instruction[]): Parser => {
    return new Parser(parser, tokens, exprInstr)
  }

  /**
   * Token指针向下位移
   * @memberof Parser
   */
  next = (): TypeToken => {
    this.current = this.nextToken;
    return (this.nextToken = this.tokens.next())
  }

  /**
   * 条件是否命中Token真值
   * @memberof Parser
   */
  matchToken = (value: undefined | ((value: TypeToken) => boolean) | string | number): boolean => {
    if (value === undefined) {
      return true
    } else if (Array.isArray(value)) {
      return value.indexOf(this.nextToken.value) !== -1
    } else if (typeof value === 'function') {
      return value(this.nextToken)
    } else if (typeof value === 'string' || typeof value === 'number') {
      return value === this.nextToken.value
    } else {
      return false
    }
  }

  /**
   * 预判是否符合预期，符合&&next 即解析下个token
   * @param {type} 约定的类型
   * @param {value} 明确规定的字面值，比如 ] , =
   * @param {next} 允许next？
   * @memberof Parser
   */
  accept = (type: string, value?, next = true): boolean => {
    if (this.nextToken && (this.nextToken.type === type) && this.matchToken(value)) {
      if (next) this.next()
      return true
    }
    return false
  }

  /**
   * accpet + 断言
   * @param {type} 约定的类型
   * @param {value} 明确规定的字面值，比如 ] , =
   * @memberof Parser
   */
  expect = (type: string, value?): never | void => {
    if (!this.accept(type, value)) {
      const { line, column } = this.tokens.getCoordinates()
      this.printLog(`> line:${line} column:${column-1} "${this.current.value}"\nThe next tag should be "${value}", But the reality is`,`${this.nextToken.type === TOKEN_END ? 'empty content' : `"${this.nextToken.value}"`}`
        , console.error
      )
      throw new Error('Unexpected Tag');
    }
  }
    
  /**
   * 暂存指针，在某些情况下单一的nextToken已经不满足预判情况，例如 typeof(add) || add(1, 2) || 1 + add;
   * @memberof Parser
   */
  temporarySaved = (): void => {
    this.savedCurrent = this.current;
    this.savedNextToken = this.nextToken;

    this.tokens.temporarySaved()
  }

  /**
   * 恢复指针
   * @memberof Parser
   */
  restore = (): void => {
    this.current = this.savedCurrent;
    this.nextToken = this.savedNextToken;
    this.tokens.restore()
  }
    
  /**
   * 解析表达式整个句柄
   * @see 如果只是求参或解析字面量，请从Conditional开始，因为MultipleEvaluation可能会误会语义，e.g.{a:1,b:2}中的“1,b:2”
   * @memberof Parser
   */
  parseExpression = (instr: Instruction[]): void => {
    const exprInstr: Instruction[] = []
    this.parseMultipleEvaluation(exprInstr)

    exprInstr.forEach(exp => (instr.push(exp)))
  }

  /**
   * 解析连续求值 例如 数组字面量 [1, 2, [3, 4, 5]]  (1, 2, 3)
   * @memberof Parser
   */
  parseMultipleEvaluation = (exprInstr: Instruction[]): void => {
    this.parseAssignmentExpression(exprInstr)

    while (this.accept(TOKEN_COMMA, ',')) {
      this.parseExpression(exprInstr)
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
    while (this.accept(TOKEN_OPERATOR, '||')) {
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
    this.parseBitwiseOrExpression(exprInstr)
    while (this.accept(TOKEN_OPERATOR, '&&')) {
      var branch = []
      this.parseBitwiseOrExpression(branch)
      exprInstr.push(new Instruction(INSTR_EXPRE, branch))
      exprInstr.push(new Instruction(INSTR_OPERA2, '&&'))
    }
  }

  /**
   * 解析 ^ 按位异或
   * @memberof Parser
   */
  parseBitwiseOrExpression = (exprInstr: Instruction[]): void => {
    this.parseBitwiseAndExpression(exprInstr)
    while (this.accept(TOKEN_OPERATOR, '^')) {
      this.parseBitwiseAndExpression(exprInstr)
      exprInstr.push(new Instruction(INSTR_OPERA2, '^'))
    }
  }

  /**
   * 解析 & 按位与
   * @memberof Parser
   */
  parseBitwiseAndExpression = (exprInstr: Instruction[]): void => {
    this.parseEqualExpression(exprInstr)
    while (this.accept(TOKEN_OPERATOR, '&')) {
      this.parseBitwiseAndExpression(exprInstr)
      exprInstr.push(new Instruction(INSTR_OPERA2, '&'))
    }
  }

  /**
   * 解析判等 ['==', '===', '!=', '!==']
   * @memberof Parser
   */
  parseEqualExpression = (exprInstr: Instruction[]): void => {
    this.parseCompareExpression(exprInstr)
    while (this.accept(TOKEN_OPERATOR, ['==', '===', '!=', '!=='])) {
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
    this.parseInOrAtExpression(exprInstr)
    while (this.accept(TOKEN_OPERATOR, ['<', '<=', '>=', '>'])) {
      var op = this.current
      this.parseInOrAtExpression(exprInstr)
      exprInstr.push(new Instruction(INSTR_OPERA2, op.value))
    }
  }

  parseInOrAtExpression = (exprInstr: Instruction[]): void => {
    this.parseBitwiseMoveExpression(exprInstr)
    while (this.accept(TOKEN_OPERATOR, ['in', '@'])) {
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
    while (this.accept(TOKEN_OPERATOR, [">>", ">>>", "<<"])) {
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
    while (this.accept(TOKEN_OPERATOR, ["+", "-"])) {
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
    while (this.accept(TOKEN_OPERATOR, ["*", "/", "%"])) {
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
    if (this.accept(TOKEN_OPERATOR, isUnaryOpeator)) {
      if (unarySymbolMapReg.test(this.current.value)) { // +, ++, +, -, !, ~,
        const op = this.current
        this.parseUnaryExpression(exprInstr); // 兼容 ++-1
        exprInstr.push(new Instruction(INSTR_OPERA1, op.value))
      } else if (this.accept(TOKEN_PAREN, '(', false)) { // typeof(
        this.restore()
        // this.parseBitwiseOrExpression(exprInstr)
        this.parseFuncCallExpression(exprInstr)
      } else if (
        [TOKEN_COMMA, TOKEN_SEMICOLON, TOKEN_END].indexOf(this.nextToken.type) !== -1 || // typeof, typeof; typeof
        (this.nextToken.type === TOKEN_PAREN && this.nextToken.value === ')') // typeof)
      ) {
        this.restore();
        this.parseField(exprInstr);
      }
    } else {
      this.parseField(exprInstr)
    }
  }

  /**
   * 解析函数调用
   * @memberof Parser
   */
  parseFuncCallExpression = (exprInstr: Instruction[]): void => {
    if (this.accept(TOKEN_OPERATOR, isUnaryOpeator)) {
      var op = this.current
      this.parseField(exprInstr)
      exprInstr.push(new Instruction(INSTR_OPERA1, op.value))
    } else {
      this.parseMemberAccessExpression(exprInstr); // a.b()
      while (this.accept(TOKEN_PAREN, '(')) {
        if (this.accept(TOKEN_PAREN, ')')) {
          // 立即调用
          exprInstr.push(new Instruction(INSTR_FUNCALL, 0)) // 参数长度 
        } else {
          let count = 0
          while (!this.accept(TOKEN_PAREN, ')')) {
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
    while (this.accept(TOKEN_OPERATOR, '.') || this.accept(TOKEN_SQUARE, '[')) {
      if (this.current.value === '.') {
        this.expect(TOKEN_NAME); // a.name ✔️  a.1×
        exprInstr.push(new Instruction(INSTR_MEMBER, this.current.value))
      } else if (this.current.value === '[') {
        this.parseExpression(exprInstr);
        this.expect(TOKEN_SQUARE, ']')
        exprInstr.push(new Instruction(INSTR_OPERA2))
      }
    }
  }

  /**
   * 解析字面值、字段值 number||string||operator(typeof cos tan)||[1,2,3]|| {a:1,b:{}} || (expression)
   * @memberof Parser
   */
  parseField = (exprInstr: Instruction[]): void => {
    if (this.accept(TOKEN_NAME) || this.accept(TOKEN_OPERATOR, isUnaryOpeator)) {
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
    } else if (this.accept(TOKEN_SQUARE, '[')) {
      // Array字面量声明 TODO: 需要和 obj['a'] 做区分
      const instr = []
      if (this.accept(TOKEN_SQUARE, ']')) { // []
        exprInstr.push(new Instruction(INSTR_ARRAY, instr))
        return
      }
      this.parseExpression(instr)
      this.expect(TOKEN_SQUARE, ']')
      exprInstr.push(new Instruction(INSTR_ARRAY, instr))
    } else if (this.accept(TOKEN_CURLY, '{', false)) {
      // Object字面量声明
      this.parseObjectLiteralDeclaration(exprInstr)
    } else {
      throw new Error('unexpected ' + this.nextToken);
    }
  }

  /**
   * 解析对象字面量 { a: 1, b: 2, c: {}}
   * @memberof Parser
   */
  parseObjectLiteralDeclaration = (exprInstr: Instruction[]) => {
    while (this.accept(TOKEN_CURLY, '{')) {
      const instr = {}
      if (this.accept(TOKEN_CURLY, '}')) { // {}
        exprInstr.push(new Instruction(INSTR_OBJECT, instr))
        return
      }
      while (this.accept(TOKEN_NAME) || this.accept(TOKEN_NUMBER) || this.accept(TOKEN_STRING)) {
        const key = this.current.value
        this.expect(TOKEN_OPERATOR, ':');
        instr[key] = [];
        if (this.accept(TOKEN_CURLY, '{', false)) {
          this.parseObjectLiteralDeclaration(instr[key])
        } else {
          this.parseConditionalExpression(instr[key]);
        }
        this.accept(TOKEN_COMMA, ',');
      }
      this.expect(TOKEN_CURLY, '}');
      exprInstr.push(new Instruction(INSTR_OBJECT, instr))
    }
  }

  /**
   * 增加提示
   * @memberof Parser
   */
  printLog = (msg: string, tip: string,  c: Console["log" | "error" | "warn"] = console.log) => {
    c(`${msg} %c${tip}`, `margin: 0 .5em;text-decoration-line: underline;text-decoration-color: red;text-decoration-style: wavy;line-height: 2em;color: red;`)
  }
}