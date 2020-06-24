import Token, { TOKEN_END, TOKEN_STRING, TOKEN_COMMA, TOKEN_FUNC, TOKEN_CURLY, TOKEN_PAREN, TOKEN_SEMICOLON, TOKEN_VAR, TOKEN_NUMBER, TOKEN_NAME, TOKEN_OPERATOR, TOKEN_SQUARE } from './token';
import { TypeToken, TypeCeval } from './interface';
import { whitespaceReg, commentReg, stringReg, constsMapReg, number2bitReg, number8bitReg, number10bitReg, number16bitReg, variableReg, operatorReg, unaryMapReg, booleanReg, execFactoryReg, number010bitReg, stringGreedyReg, numberEbitReg } from './utils/regExp';
import { jsWord, jsAttr } from './utils/reservedWord';
import { contains, isPalindrome, filterUndefine } from './utils/index';

/**
 * 语法解析
 * @class TokenStream
 */
export default class TokenStream {
  // 当前指针下标
  pos = 0;

  // 当前解析character
  current: null | TypeToken = null;

  // 暂存指针
  savedPosition = 0;

  // 暂存解析character，在某些情况下做预判比如, cos是函数，cos() || map(cos) “cos)” 可能被函数parser判定为语法错误
  savedCurrent: null | TypeToken = null;

  // eslint-disable-next-line
  constructor(public ceval: TypeCeval, public expression: string) {}

  /**
   * @desc 获取nextToken，适用语法前置校验
   * @memberof TokenStream
   */
  checkNextAccessGrammar = (): TypeToken => {
    this.temporarySaved();
    const next = this.next();
    this.restore();
    return next
  }

  /**
   * @desc 某些情况下做正则优化，比如 operator 至多3位，所以截取3位再匹配
   * @param len 获取的长度
   * @param offset 位移
   * @see charAt与substr性能对比 https://jsperf.com/substr-or-charat
   * @memberof TokenStream
   */
  getSomeCode = (len = 1, offset = 0): string => {
    const start = offset + this.pos
    const { length } = this.expression;
    // debugger
    return this.expression.substr(start, (start + len) > length ? length - start : len)
  }

  /**
   * @desc 获取首个单词
   * @memberof TokenStream
   */
  getFirstWord = (): string => {
    const result = this.expression.substr(this.pos).match(/\b\w*\b/)
    return result ? result[0] : ''
  }

  /**
   * 创建新的fieldType实例
   * @memberof TokenStream
   */
  newToken = (type: string, value: number | string, pos?: number): TypeToken => {
    return new Token(type, value, pos != null ? pos : this.pos);
  }

  /**
   * 解析下一个 field
   * @memberof TokenStream
   */
  next = (): TypeToken => {
    if (!this.expression.length) {
      return this.newToken(TOKEN_NAME, "undefined")
    }
    if (this.pos >= this.expression.length) {
      return this.newToken(TOKEN_END, 'END');
    }

    if (this.isWhiteSpace() || this.isComment()) {
      return this.next()
    } else if (
      this.isNumber() ||
      this.isString() ||
      this.isBoolean() ||
      this.isParenthesis() ||
      this.isComma() ||
      this.isOperator() ||
      this.isSemicolon() ||
      this.isConst() ||
      this.isVariable() ||
      this.isFunctionDefined() ||
      this.isName()
    ) {
      return this.current
    } else {
      this.parseError(`unknown character: ${this.expression.charAt(this.pos)}`, SyntaxError)
    }
  }

  temporarySaved = (): void => {
    this.savedPosition = this.pos;
    this.savedCurrent = this.current;
  }

  restore = (): void => {
    this.pos = this.savedPosition;
    this.current = this.savedCurrent
  }

  /**
   * 过滤空格 \t \r \n
   * @memberof TokenStream
   */
  isWhiteSpace = (): boolean => {
    const matchWS = whitespaceReg.exec(this.getSomeCode())
    while (matchWS && matchWS[1]) {
      this.pos++
      return true
    }
    return false
  }

  /**
   * 过滤注释 /*  *\/
   * @memberof TokenStream
   */
  isComment = (): boolean => {
    const prefixCm = this.getSomeCode(2);
    let matchResult: string | undefined
    if (prefixCm === '/*') {
      matchResult = execFactoryReg(commentReg, this.getSomeCode(Infinity))
    } else if(prefixCm === '//') { // comment break line
      matchResult = execFactoryReg(/^(\/\/.*\n?)/, this.getSomeCode(Infinity));
    }

    if (matchResult) {
      this.pos += matchResult.length +(prefixCm === '/*'? (2 + 2):0); // /*matchResult*/
      return true
    }
    return false
  }

  /**
   * 过滤空格 \t \r \n
   * @memberof TokenStream
   */
  isBoolean = (): boolean => {
    const matchWS = booleanReg.exec(this.getSomeCode())
    while (matchWS && matchWS[1]) {
      this.pos++
      return true
    }
    return false
  }

  /**
   * 申明变量 TODO:support
   * @memberof TokenStream
   */
  isVariable = (): boolean => {
    const word = this.getFirstWord()
    if (contains(['const', 'var', 'let'], word)) {
      this.pos += word.length;
      this.current = this.newToken(TOKEN_VAR, word)
      const nextToken = this.checkNextAccessGrammar()

      if (nextToken.type !== TOKEN_NAME) {
        throw new Error(`${word} ${nextToken.value} : This syntax Not as expected, should be "${TOKEN_NAME}", but is "${nextToken}"`)
      } else if(contains(this.ceval.consts, nextToken.value)){
        throw new SyntaxError(`SyntaxError:  Unexpected token '${nextToken.value}', it has been stated in consts.`)
      }
      return true
    }
    return false
  }

  /**
   * 数字 
   * @see 说明 需要考虑到 2进制0b10100 === 8进制024 === 10进制20 === 16进制0x14 === 10e0 === 20.000
   * @memberof TokenStream
   */
  isNumber = (): boolean => {
    const first = this.getSomeCode()
    let number: string | undefined
    let bit: number
    const expr = this.getSomeCode(this.expression.length - this.pos)

    if ((/\d|\./.test(first) === false) || (first === '.' && /\.\d/.test(this.getSomeCode(2)) === false)) return false

    const [n] = expr.match(/^(0(x|b)+[0-9a-zA-Z]{1,})|(^0?\d*(\.\d+)?)/); // 019 可能会被8进制拦截掉01， 所以必须要做^$
    number10bitReg.lastIndex = 0;
    if (first === '0' && n.length > 1 && !(/^0\.\d/.test(n))) { // 0.x 不是进制数
      if (contains(['b', 'x'], this.getSomeCode(1, 1)) && this.getSomeCode(1, n.length) === '.') {
        // 0b0101.1 0xaf.1 ❌
        // 099.1 属于十进制 ✅
        this.parseError(`number '${n}' cannot is a floating point number, but actual is: '${n}${this.getSomeCode(3, n.length)}'`, SyntaxError)
        return false
      }

      if (number2bitReg.test(n)) {
        // 2进制
        // @see 0b01 0b1110
        number = execFactoryReg(number2bitReg, n)
        bit = number === undefined ? undefined : 2
      } else if (number8bitReg.test(n)) {
        // 8进制
        // @see 012 || 077 ✅ 
        // @warn 080 || 079 ❌都是十进制  并非8进制
        number = execFactoryReg(number8bitReg, n)
        bit = number === undefined ? undefined : 8
      } else if (number16bitReg.test(n)) {
        // 16进制 
        // @see 0xadf
        number = execFactoryReg(number16bitReg, n)
        bit = number === undefined ? undefined : 16
      } else if (number010bitReg.test(n)) {
        // 0开头十进制 
        // @see 079 || 080  ✅
        // @warn 03.1 || 00.1 || 00.  ❌ 
        number = execFactoryReg(number010bitReg, n)
        bit = number === undefined ? undefined : 10
      } else {
        this.parseError('number bitbase parser error', SyntaxError)
        return false
      }
      this.pos += number.length
      if (number !== undefined && !this.ceval.getOptions().endableBitNumber) { // 给出准确的warning 
        throw new Error(`options "endableBitNumber": You have disabled bitbase number parsing, Not allowed ${number}`)
      }
    } else if(numberEbitReg.test(expr)) { // 科学计数法
      numberEbitReg.lastIndex = 0;
      const [, match, base, times] = numberEbitReg.exec(expr);
      this.pos += (match.length || (base.length + times.length + 1));
      number = match || (Number(base) * Math.pow(10, Number(times))).toString()
      bit = 10;
    }else if (number10bitReg.test(expr)) { // 十进制
      // 100 || 100.1 || 0.1 || .100 || .0  ✅ 
      // parseFloat是支持 0100.1 的。
      number = execFactoryReg(number10bitReg, expr)
      bit = number === undefined ? undefined : 10
      this.pos += number.length
    } else {
      return false
    }

    if (bit === 10) {
      this.current = this.newToken(TOKEN_NUMBER, parseFloat(number))
    } else {
      this.current = this.newToken(TOKEN_NUMBER, parseInt(number.replace('0b', '').replace('0x', ''), bit))
    }
    return true
  }

  /**
   * 字符串
   * @see '' \'\' \"\" \"\'\'\"
   * @memberof TokenStream
   */
  isString = (): boolean => {
    const first = this.getSomeCode()
    const expr = this.getSomeCode(Infinity)
    let matchString: RegExpExecArray | undefined
    let strContent: string | undefined
    if (first === '\"' || first === '\'') {
      stringGreedyReg.lastIndex = 0;
        // 一种情况是需要贪婪匹配 \'\'a\'\', 判断是否需要贪婪匹配
      matchString = stringGreedyReg.exec(expr)
      strContent = filterUndefine(matchString[1], matchString[2])
      if (!isPalindrome(strContent)) {
        // 不属于回文字符串则需要重新做惰性匹配
        // 另一种则需要惰性 "'a', 'b'" => "a"
        stringReg.lastIndex = 0;
        matchString = stringReg.exec(expr);
        strContent = filterUndefine(matchString[1], matchString[2])
      }

      if (strContent !== undefined) {
        this.current = this.newToken(TOKEN_STRING, strContent, this.pos)
        this.pos += (strContent.length + first.length * 2); // "" 是没有长度的，会导致Token指针一直处于 "" 
        return true
      }
    }

    return false
  }

  isFunctionDefined = (): boolean => {
    const word = this.getFirstWord();
    if(word === 'function') {
      // TODO: 初期只支持 第一种, 同时支持 function fn() {} || const a = () => {} || const b = function(){}
      this.current = this.newToken(TOKEN_FUNC, undefined);
      this.pos+=word.length
      const nextToken = this.checkNextAccessGrammar(); 
      if(nextToken.type !== TOKEN_NAME) {
        this.parseError('function definition should have function name')
        return false
      }
      return true;
    }
    return false
  }
  
  /**
   * 变量，可能是名称
   * @see 遵循变量申明规范 可以以 $_ 开头，其他可以是 $_数字字母 ，排除保留字
   * @memberof TokenStream
   */
  isName = (): boolean => {
    const first = this.getSomeCode()
    let result
    if (first === '_' || first === '$' || /^[a-zA-Z]/.test(first)) {
      variableReg.lastIndex = 0
      result = variableReg.exec(this.getSomeCode(Infinity))
    }

    if (result === undefined || result === null || typeof result[1] !== "string") {
      return false
    }

    [, result] = result;

    if (jsWord[result] === false) {
      // 检测到保留字
      this.parseError(`parser an reserved word: ${result}`)
      return false
    }

    if (jsAttr[result] === false) {
      // 检测到window属性 TODO: 应该命中 window.xxx
      this.parseError(`parser an window native attributes or methods: ${result}`)
      return false
    }

    this.pos += result.length
    this.current = this.newToken(TOKEN_NAME, result)
    return true
  }

  /**
   * 内置常量
   * @see const 例如 true false PI undefined null
   * @memberof TokenStream
   */
  isConst = (): boolean => {
    constsMapReg.lastIndex = 0;
    const result = constsMapReg.exec(this.getSomeCode(Infinity))

    if (result && result[1]) {
      this.current = this.newToken(TOKEN_NAME, result[1])
      this.pos += result[1].length;
      const constKey = this.checkNextAccessGrammar();
      // 检查是否是const常量赋值
      if(constKey.type === TOKEN_OPERATOR && constKey.value === '=') {
        this.parseError(`parser error: consts of ${this.current.value} can not assignment;`, SyntaxError)
      }
      return true
    }

    return false
  }

  /**
   * 分号
   * @see ;
   * @memberof TokenStream
   */
  isSemicolon = (): boolean => {
    var first = this.getSomeCode();
    if (first === ';') {
      this.current = this.newToken(TOKEN_SEMICOLON, ';');
      this.pos++;
      return true;
    }
    return false;
  };

  /**
   * 逗号,
   * @see ,
   * @memberof TokenStream
   */
  isComma = (): boolean => {
    var first = this.getSomeCode();
    if (first === ',') {
      this.current = this.newToken(TOKEN_COMMA, ',');
      this.pos++;
      return true;
    }
    return false;
  };

  /**
   * 圆、方括号
   * @see ;
   * @memberof TokenStream
   */
  isParenthesis = (): boolean => {
    var first = this.getSomeCode();
    if (contains(['(', ')'], first)) {
      this.current = this.newToken(TOKEN_PAREN, first);
    } else if (contains(['[', ']'], first)) {
      this.current = this.newToken(TOKEN_SQUARE, first);
    } else if (contains(['{', '}'], first)) {
      this.current = this.newToken(TOKEN_CURLY, first);
    } else {
      return false
    }
    this.pos++;
    return true;
  };

  /**
   * 判断是否操作符 
   * @see 操作符 + - * / || % ^ ? : . > < = >= <= | == === != !== in
   * @memberof TokenStream
   */
  isOperator = (): boolean => {
    const str = this.getSomeCode(Infinity);
    let result: string | undefined
    if (operatorReg.test(str)) {
      result = execFactoryReg(operatorReg, str)
    } else if (unaryMapReg.test(str)) {
      result = execFactoryReg(unaryMapReg, str)
    }
    
    if (!result) return false

    if(this.ceval.getOptions().endableOperators === false) {
      throw new Error(`options "endableOperators": You disabled the operator, Therefore, "${result}" it can not be used`)
    }
    result = result.replace(/\s/g, '')
    this.pos += result.length
    this.current = this.newToken(TOKEN_OPERATOR, result)
    return true
  }

  /**
   * 获取当前character定位
   * @memberof TokenStream
   */
  getCoordinates = (): { line: number, column: number } => {
    let line = 0;
    let column = 0;
    let index = -1;
    
    do {
      line++;
      column = this.pos - index;
      index += 1
      index += this.expression.substr(index).indexOf('\n'); // 从每一行第一位开始寻找下一个换行符
    } while (index >= 0 && index < this.pos && line < this.pos)
    return {
      line,
      column
    };
  };

  /**
   * 解析出错
   * @memberof TokenStream
   */
  parseError = (msg: string, ErrorType: ErrorConstructor | SyntaxErrorConstructor | TypeErrorConstructor = Error): never => {
    var coords = this.getCoordinates();
    throw new ErrorType('parse error [' + coords.line + ':' + coords.column + '] => ' + msg);
  };

}