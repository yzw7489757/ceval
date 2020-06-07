import Ceval from './index';
import { TypeTokenStream, TypeToken, TypeInstruction } from './interface';
import Instruction, { INSTR_EXPRE, INSTR_FUNCDEF, INSTR_PLAIN, INSTR_VARNAME, INSTR_NAME, INSTR_FUNCALL, INSTR_OBJECT, INSTR_OPERA1, INSTR_MEMBER, INSTR_OPERA2, INSTR_OPERA3, INSTR_ARRAY, INSTR_NUMBER, INSTR_VAR } from './instruction';
import { TOKEN_OPERATOR, TOKEN_NAME, TOKEN_SQUARE, TOKEN_PAREN, TOKEN_NUMBER, TOKEN_STRING, TOKEN_COMMA, TOKEN_SEMICOLON, TOKEN_END, TOKEN_CURLY, TOKEN_VAR, TOKEN_FUNC } from './token';
import { unarySymbolMapReg, isUnaryOpeator } from './utils/regExp';
import { contains } from './utils/index';

/**
 * 解析器
 * @export
 * @class Parser
 */
export default class Parser {
  /**
   * @desc 当前TOKEN指针
   */
  current: TypeInstruction | null = null;

  /**
   * @desc 暂存指针
   */
  savedCurrent: TypeInstruction | null = null;

  /**
   * @desc 下个TOKEN指针对象
   */
  nextToken: TypeToken | null = null;

  /**
   * @desc 暂存next TOKEN
   */
  savedNextToken: TypeToken | null = null;

  constructor(public ceval: Ceval, public tokens: TypeTokenStream, exprInstr: TypeInstruction[]) {
    this.next();
    
    this.inspectParseEnd(exprInstr)
  }

  /**
   * 检查是否解析完毕
   */
  private inspectParseEnd = (exprInstr: TypeInstruction[]) => {
    do {
      this.parseExpression(exprInstr)
    } while (this.tokens.pos < this.tokens.expression.length) 
  }

  /**
   * 生成实例解析表达式，简化调用方式
   */
  static generatorParser = (parser: Ceval, tokens: TypeTokenStream, exprInstr: TypeInstruction[]): Parser => {
    return new Parser(parser, tokens, exprInstr)
  }

  /**
   * Token指针向下位移
   */
  next = (): TypeToken => {
    this.current = this.nextToken;
    return (this.nextToken = this.tokens.next())
  }

  /**
   * 条件是否命中Token真值
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
   * 预判是否符合预期，符合&&解析下个token
   * @param {type} 约定的类型
   * @param {value} 明确规定的字面值，比如 ] , =
   * @param {next} 允许next？
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
   */
  expect = (type: string, value?): never | void => {
    if (!this.accept(type, value)) {
      const { line, column } = this.tokens.getCoordinates()
      this.printLog(`> line:${line} column:${column - 1} "${this.current.value}"\nThe next tag should be "${value}", But the reality is`, `${this.nextToken.type === TOKEN_END ? 'empty content' : `"${this.nextToken.value}"`}`
        , console.error
      )
      throw new Error('Unexpected Tag');
    }
  }

  /**
   * 暂存指针，在某些情况下单一的nextToken已经不满足预判情况，例如 typeof(add) || add(1, 2) || 1 + add;
   */
  temporarySaved = (): void => {
    this.savedCurrent = this.current;
    this.savedNextToken = this.nextToken;

    this.tokens.temporarySaved()
  }

  /**
   * 恢复指针
   */
  restore = (): void => {
    this.current = this.savedCurrent;
    this.nextToken = this.savedNextToken;
    this.tokens.restore()
    return undefined
  }

  /**
   * 解析表达式整个句柄
   * @see 如果只是求参或解析字面量，请从Conditional开始，因为MultipleEvaluation可能会误会语义，e.g.{a:1,b:2}中的“1,b:2”
   */
  parseExpression = (instr: TypeInstruction[]): void => {
    const exprInstr: TypeInstruction[] = []
    
    this.parseMultipleEvaluation(exprInstr)
    exprInstr.forEach(exp => (instr.push(exp)))
  }

  /**
   * 解析连续求值 例如 数组字面量 [1, 2, [3, 4, 5]]  (1, 2, 3)
   */
  parseMultipleEvaluation = (exprInstr: TypeInstruction[]): void => {
    this.parseAssignmentExpression(exprInstr)
    while (this.accept(TOKEN_COMMA, ',')) {
      this.parseConditionalExpression(exprInstr)
    }
  }

  /**
   * 解析变量赋值表达式 TOKEN_OPERATOR name = 1
   */
  parseAssignmentExpression = (exprInstr: TypeInstruction[]): void => {
    this.parseConditionalExpression(exprInstr)
    while (this.accept(TOKEN_OPERATOR, '=')) {
      let ident
      if (exprInstr[exprInstr.length - 1].type === INSTR_VAR) {
        ident = exprInstr.pop()
      }
      if (exprInstr[exprInstr.length - 1].type === INSTR_NAME) {
        exprInstr.push(new Instruction(INSTR_VARNAME, exprInstr.pop().value))
      }
      const instr: TypeInstruction[] = []
      this.parseExpression(instr)
      exprInstr.push(new Instruction(INSTR_EXPRE, instr))
      if (ident) exprInstr.push(ident)
      exprInstr.push(new Instruction(INSTR_OPERA2, '='))
    }
  }

  /**
   * 解析三目运算符
   */
  parseConditionalExpression = (exprInstr: TypeInstruction[]): void => {
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
   */
  parseOrExpression = (exprInstr: TypeInstruction[]): void => {
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
   */
  parseAndExpression = (exprInstr: TypeInstruction[]): void => {
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
   */
  parseBitwiseOrExpression = (exprInstr: TypeInstruction[]): void => {
    this.parseBitwiseAndExpression(exprInstr)
    while (this.accept(TOKEN_OPERATOR, '^')) {
      this.parseBitwiseAndExpression(exprInstr)
      exprInstr.push(new Instruction(INSTR_OPERA2, '^'))
    }
  }

  /**
   * 解析 & 按位与
   */
  parseBitwiseAndExpression = (exprInstr: TypeInstruction[]): void => {
    this.parseEqualExpression(exprInstr)
    while (this.accept(TOKEN_OPERATOR, '&')) {
      this.parseBitwiseAndExpression(exprInstr)
      exprInstr.push(new Instruction(INSTR_OPERA2, '&'))
    }
  }

  /**
   * 解析判等 ['==', '===', '!=', '!==']
   */
  parseEqualExpression = (exprInstr: TypeInstruction[]): void => {
    this.parseCompareExpression(exprInstr)
    while (this.accept(TOKEN_OPERATOR, ['==', '===', '!=', '!=='])) {
      var op = this.current
      this.parseCompareExpression(exprInstr)
      exprInstr.push(new Instruction(INSTR_OPERA2, op.value))
    }
  }

  /**
   * 解析比较运算符 ['<', '<=', '>=', '>']
   */
  parseCompareExpression = (exprInstr: TypeInstruction[]): void => {
    this.parseInOrAtExpression(exprInstr)
    while (this.accept(TOKEN_OPERATOR, ['<', '<=', '>=', '>'])) {
      var op = this.current
      this.parseInOrAtExpression(exprInstr)
      exprInstr.push(new Instruction(INSTR_OPERA2, op.value))
    }
  }

  /**
  * 解析或运算符 ['||', '@'] @待补位
  */
  parseInOrAtExpression = (exprInstr: TypeInstruction[]): void => {
    this.parseBitwiseMoveExpression(exprInstr)
    while (this.accept(TOKEN_OPERATOR, ['in'/** ,"@" */])) {
      var op = this.current
      this.parseBitwiseMoveExpression(exprInstr)
      exprInstr.push(new Instruction(INSTR_OPERA2, op.value))
    }
  }

  /**
   * 解析按位移 [">>", ">>>", "<<"]
   */
  parseBitwiseMoveExpression = (exprInstr: TypeInstruction[]): void => {
    this.parseAddOrSubExpression(exprInstr)
    while (this.accept(TOKEN_OPERATOR, [">>", ">>>", "<<"])) {
      var op = this.current
      this.parseAddOrSubExpression(exprInstr)
      exprInstr.push(new Instruction(INSTR_OPERA2, op.value))
    }
  }

  /**
   * 解析加减法 + -
   */
  parseAddOrSubExpression = (exprInstr: TypeInstruction[]): void => {
    this.parseMulOrDivExpression(exprInstr)
    while (this.accept(TOKEN_OPERATOR, ["+", "-"])) {
      var op = this.current
      this.parseMulOrDivExpression(exprInstr)
      exprInstr.push(new Instruction(INSTR_OPERA2, op.value))
    }
  }

  /**
   * 解析乘除取模 * / %
   */
  parseMulOrDivExpression = (exprInstr: TypeInstruction[]): void => {
    this.parseUnaryExpression(exprInstr)
    while (this.accept(TOKEN_OPERATOR, ["*", "/", "%"])) {
      var op = this.current
      this.parseUnaryExpression(exprInstr)
      exprInstr.push(new Instruction(INSTR_OPERA2, op.value))
    }
  }

  /**
   * 解析一元运算符 [+, ++, +, -, !, ~, cos, tan, typeof]
   */
  parseUnaryExpression = (exprInstr: TypeInstruction[]): void => {
    this.temporarySaved();
    if (this.accept(TOKEN_OPERATOR, isUnaryOpeator)) {// 内置函数调用
      if (unarySymbolMapReg.test(this.current.value)) { // +, ++, +, -, !, ~,
        const op = this.current
        this.parseUnaryExpression(exprInstr); // 兼容 ++-1
        exprInstr.push(new Instruction(INSTR_OPERA1, op.value))
      } else if (this.accept(TOKEN_PAREN, '(', false)) { // typeof(
        this.restore()
        this.parsePersetFuncCallExpression(exprInstr)
      } else if (
        [TOKEN_COMMA, TOKEN_SEMICOLON, TOKEN_END].indexOf(this.nextToken.type) !== -1 || // typeof, typeof; typeof
        (this.nextToken.type === TOKEN_PAREN && this.nextToken.value === ')') // typeof)
      ) {
        this.restore();
        this.parseField(exprInstr);
      }
    } else {
      this.parseOuterFunctionCallExpression(exprInstr) // 外置函数 || 内声明函数
    }
  }

  /**
   * 外置函数调用
   */
  parseOuterFunctionCallExpression = (exprInstr: TypeInstruction[]) => {
    this.parseMemberAccessExpression(exprInstr)
    if (this.current.type === TOKEN_NAME && this.accept(TOKEN_PAREN, '(', false)) {
      this.parseArguments(exprInstr)
    }
  }

  /**
   * 解析内置函数调用
   */
  parsePersetFuncCallExpression = (exprInstr: TypeInstruction[]): void => {
    if (this.accept(TOKEN_OPERATOR, isUnaryOpeator)) {
      var op = this.current
      this.parseField(exprInstr)
      exprInstr.push(new Instruction(INSTR_OPERA1, op.value))
    } else {
      this.parseMemberAccessExpression(exprInstr); // a.b()
      this.parseArguments(exprInstr)
    }
  }

  /**
   * 解析调用函数的实参
   */
  parseArguments = (exprInstr: TypeInstruction[]): void => {
    while (this.accept(TOKEN_PAREN, '(')) {
      if (this.accept(TOKEN_PAREN, ')')) {
        // 立即调用
        exprInstr.push(new Instruction(INSTR_FUNCALL, 0)) // 参数长度 
      } else {
        let count = 0
        while (!this.accept(TOKEN_PAREN, ')')) {
          do {
            this.parseConditionalExpression(exprInstr);
            count++;
          } while (this.accept(TOKEN_COMMA))
        }
        exprInstr.push(new Instruction(INSTR_FUNCALL, count))
      }
    }
  }

  /**
   * 解析成员访问符 . []
   */
  parseMemberAccessExpression = (exprInstr: TypeInstruction[]): void => {
    this.parseField(exprInstr);
    while (
      this.accept(TOKEN_OPERATOR, '.') ||
      (contains<string>([TOKEN_SQUARE, TOKEN_NAME], this.current.type) && this.accept(TOKEN_SQUARE, '['))) {
      if (!this.ceval.getOptions().allowMemberAccess) {
        throw new Error(`options "allowMemberAccess": You have disabled member access and cannot use syntax such as "a.b" "a['b']"`)
      }
      if (this.current.value === '.') {
        this.expect(TOKEN_NAME); // a.name ✔️  a.1×
        exprInstr.push(new Instruction(INSTR_MEMBER, this.current.value))
      } else if (this.current.value === '[') {
        this.parseExpression(exprInstr);
        this.expect(TOKEN_SQUARE, ']')
        exprInstr.push(new Instruction(INSTR_MEMBER))
      }
    }
  }


  /**
   * 解析字面值、字段值 number||string||operator(typeof cos tan)||[1,2,3]|| {a:1,b:{}} || (expression) || function abs() {}
   */
  parseField = (exprInstr: TypeInstruction[]): void => {
    if (this.accept(TOKEN_OPERATOR, isUnaryOpeator)) {
      // 内置前缀运算符 cos tan - +
      exprInstr.push(new Instruction(INSTR_OPERA1, this.current.value));
    } else if (this.accept(TOKEN_NAME)) {
      // 变量名称
      exprInstr.push(new Instruction(INSTR_NAME, this.current.value));
    } else if (this.accept(TOKEN_NUMBER)) {
      // 数字类型
      exprInstr.push(new Instruction(INSTR_NUMBER, this.current.value));
    } else if (this.accept(TOKEN_STRING)) {
      // 字符串类型 \"name\"
      exprInstr.push(new Instruction(INSTR_PLAIN, this.current.value));
    } else if (this.accept(TOKEN_PAREN, '(')) {
      // 圆括号，调用 或 表达式(a=1)
      this.parseExpression(exprInstr);
      this.expect(TOKEN_PAREN, ')');
    } else if (this.accept(TOKEN_SQUARE, '[')) {
      //  数组字面量
      this.parseArrayLiteralDeclaration(exprInstr)
    } else if (this.accept(TOKEN_CURLY, '{', false)) {
      // Object字面量声明
      this.parseObjectLiteralDeclaration(exprInstr)
    } else if (this.accept(TOKEN_CURLY, '}', false)) {
      // return
    } else if (this.accept(TOKEN_VAR, ['const', 'var', 'let'])) {
      const identifier = this.current
      this.parseField(exprInstr)
      exprInstr.push(new Instruction(INSTR_VAR, identifier.value))
    } else if (this.accept(TOKEN_FUNC, undefined, false)) {
      this.parseFunctionDefinedDeclaration(exprInstr);
    } else if (this.accept(TOKEN_SEMICOLON)) {
      // 
    } else {
      throw new Error('unexpected ' + this.nextToken);
    }
  }

  /**
   * 解析对象字面量 { a: 1, b: 2, c: {}}
   */
  parseArrayLiteralDeclaration = (exprInstr: TypeInstruction[]) => {
    // Array字面量声明 TODO: 需要和 obj['a'] 做区分
    const instr = []
    if (this.accept(TOKEN_SQUARE, ']')) { // []
      exprInstr.push(new Instruction(INSTR_ARRAY, instr))
      return
    }
    this.parseExpression(instr)
    this.expect(TOKEN_SQUARE, ']')
    exprInstr.push(new Instruction(INSTR_ARRAY, instr))
  }

  /**
   * 解析对象字面量 { a: 1, b: 2, c: {}}
   */
  parseObjectLiteralDeclaration = (exprInstr: TypeInstruction[]) => {
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
      this.accept(TOKEN_SEMICOLON, ';')
      exprInstr.push(new Instruction(INSTR_OBJECT, instr))
    }
  }

  /**
   * 解析函数声明
   */
  parseFunctionDefinedDeclaration = (expreInstr: TypeInstruction[]) => {
    while (this.accept(TOKEN_FUNC)) {
      if (this.accept(TOKEN_NAME)) { // function fn(){}
        const funcName = this.current.value;
        const instr = []; // 参数 与 函数体
        if (this.accept(TOKEN_PAREN, '(')) {
          do {
            this.parseField(instr); // TODO fn(a=1) 待兼容
          } while (this.accept(TOKEN_COMMA))
          this.expect(TOKEN_PAREN, ')')
        }
        this.parseFunctionBodyExpression(instr)
        expreInstr.push(new Instruction(INSTR_FUNCDEF, instr))
        expreInstr.push(new Instruction(INSTR_FUNCDEF, funcName))
      }
    }
  }

  /**
   * 解析函数体, 花括号 { }, 应该视作一个新的作用域. // TODO: 可作为单独作用域体
   */
  parseFunctionBodyExpression = (exprInstr: TypeInstruction[]) => {
    if (this.accept(TOKEN_CURLY, '{')) {
      const instr = [];
      do {
        this.parseExpression(instr)
      } while (this.accept(TOKEN_SEMICOLON, ';'))
      this.expect(TOKEN_CURLY, '}')
      this.accept(TOKEN_SEMICOLON, ';')
      exprInstr.push(new Instruction(INSTR_EXPRE, instr))
    }
  }

  /**
   * 增加提示
   */
  printLog = (msg: string, tip: string, c: Console["log" | "error" | "warn"] = console.log) => {
    c(`${msg} %c${tip}`, `margin: 0 .5em;text-decoration-line: underline;text-decoration-color: red;text-decoration-style: wavy;line-height: 2em;color: red;`)
  }
}