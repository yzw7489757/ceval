import cloneDeep from 'lodash/cloneDeep'
import Token, { TOKEN_END, TOKEN_STRING, TOKEN_PAREN, TOKEN_SEMICOLON, TOKEN_VAR, TOKEN_NUMBER, TOKEN_NAME, TOKEN_OPERATOR } from './token';
import { TypeToken, TypeCeval } from './interface';
import { whitespace, comment, string, number2bit, number8bit, number10bit, number16bit, variable, operator } from './regExp';
import { jsWord, jsAttr } from './utils/reservedWord';
import { lowerCaseLetters, uppperCaseLetters } from './utils/letter';

/**
 * 语法解析
 * @class TokenStream
 */
export default class TokenStream {
  // 当前指针
  pos = 0; 

  // 当前解析character
  current: null | TypeToken = null; 

  // 暂存指针
  savedPosition = 0;
  
  // 暂存解析character，在某些情况下做预判比如, cos是函数，cos() || map(cos) “cos)” 可能被函数parser判定为语法错误
  savedCurrent: null | TypeToken = null; 

  constructor(public parser: TypeCeval, public expression: string) {
    console.log(this.parser)
  }

  /**
   * @desc 适用语法校验检查
   * @memberof TokenStream
   */
  checkNextAccessGrammar = (): TypeToken => {
    const pos = this.pos;
    const current = cloneDeep(this.current)

    const next = this.next();

    this.current = current;
    this.pos = pos
    
    return next
  }

  /**
   * @desc 某些情况下做正则优化，比如operator至多3位，所以截取3位再匹配
   * @see charAt与substr性能对比 https://jsperf.com/substr-or-charat
   * @memberof TokenStream
   */
  getSomeCode = (len = 1, offset = 0): string => {
    const start = offset + this.pos
    const { length } = this.expression;
    return this.expression.substr(start, start + len > length ? Math.max(length - len, 0) : len )
  }

  /**
   * @desc 获取首个单词
   * @memberof TokenStream
   */
  getFirstWord = (): string => {
    const result = this.expression.match(/\b\w*\b/)
    return result ? result[0] : ''
  }

  /**
   * 创建新的fieldType实例
   * @memberof TokenStream
   */
  newToken = (type: string, value: any, pos?: number): TypeToken => {
    return new Token(type, value, pos != null ? pos : this.pos);
  }

  /**
   * 解析下一个 field
   * @memberof TokenStream
   */
  next = (): TypeToken => {
    if (this.pos >= this.expression.length) {
      return this.newToken(TOKEN_END, 'END');
    }

    if(this.isWhiteSpace() || this.isComment()) {
      return this.next()
    }else if(
      this.isNumber() || 
      this.isString() || 
      this.isName()   ||
      this.isOperator() ||
      this.isSemicolon() ||
      this.isConst()  ||
      this.isParenthesis()
      ){
      return this.current
    }else{
      this.parseError(`unknown character: ${this.expression.charAt(this.pos)}`)
    }
  }
  
  /**
   * 过滤空格 \t \r \n
   * @memberof TokenStream
   */
  isWhiteSpace = (): boolean => {
    const matchWS = whitespace.exec(this.getSomeCode())
    while(matchWS && matchWS[1]){
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
    if(this.getSomeCode() === '/' && this.getSomeCode(1, 1) === '*'){
      comment.lastIndex = 0;
      const matchResult = comment.exec(this.expression.substr(this.pos))
      if(matchResult && matchResult[1]){
        this.pos += matchResult[1].length + 2 + 2; // /*matchResult[1]*/
        return true
      }
    }
    return false
  }

  /**
   * 申明变量
   * @memberof TokenStream
   */
  isVariable = (): boolean => {
    const word = this.getFirstWord()
    if(['const','var', 'let'].indexOf(word) !== -1){
      this.pos += word.length;
      this.current = this.newToken(TOKEN_VAR, word)
      const nextToken = this.checkNextAccessGrammar()
      if(nextToken.type !== TOKEN_NAME){
        throw new Error(`${word} ${nextToken.value} : This syntax Not as expected, should be ${TOKEN_NAME}, but is ${nextToken.type}`)
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
    let number
    const expr = this.getSomeCode(this.expression.length - this.pos)
    if(first === '0') {
      if(number2bit.test(expr)){
        // 2进制
        number2bit.lastIndex = 0;
        const bit2Result = number2bit.exec(expr)
        number = bit2Result ? bit2Result[1] : undefined;
      }else if(number8bit.test(expr)){
        // 8进制
        // @see 080 || 079 都是十进制  并非8进制
        number8bit.lastIndex = 0;
        const bit8Result = number8bit.exec(expr)
        number = bit8Result ? bit8Result[1] : undefined;
      }else if(number16bit.test(expr)){
        // 16进制 0xadf
        number16bit.lastIndex = 0;
        const bit16Result = number16bit.exec(expr)
        number = bit16Result ? bit16Result[1] : undefined;
      }else if(number10bit.test(expr)){
        // 十进制 .200 || 079 || 080 0b30
        number10bit.lastIndex = 0;
        const bit10Result = number10bit.exec(expr)
        number = bit10Result ? bit10Result[1] : undefined;
      }

      if(number === undefined){
        this.parseError('number bit parser Error')
        return false
      }
      
    }else if(number10bit.test(expr)){
        number10bit.lastIndex = 0;
        const bit10Result = number10bit.exec(expr)
        number = bit10Result ? bit10Result[1] : undefined;
    }

    if(!number) return false
    this.pos += number.length
    this.current = this.newToken(TOKEN_NUMBER, parseFloat(number))

    return true
  }

  /**
   * 字符串
   * @see 说明 需要考虑到 2进制0b10100 === 8进制024 === 10进制20 === 16进制0x14 === 10e0 === 20.000
   * @memberof TokenStream
   */
  isString = (): boolean => {
    const first = this.getSomeCode()

    if(first === '\"' || first === '\'') {
      const matchString = string.exec(this.expression.substr(this.pos));
      if(matchString && matchString[1]){
        this.current = this.newToken(TOKEN_STRING, matchString[1], this.pos)
        this.pos += matchString[1].length;
        return true
      }
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
    if(first === '_' || first === '$' || [...lowerCaseLetters, ...uppperCaseLetters].indexOf(first) !== -1){
      variable.lastIndex = 0
      result = variable.exec(this.expression.substr(this.pos))
    }

    if(result === undefined || result === null || typeof result[1] !== "string"){
      return false
    }

    if(~jsWord.indexOf(result[1])) {
      // 检测到保留字
      this.parseError(`parser an reserved word: ${result[1]}`)
      return false
    }

    if(~jsAttr.indexOf(result[1])) {
      // 检测到window属性
      this.parseError(`parser an window native attributes or methods: ${result[1]}`)
      return false
    }


    this.pos += result.length
    this.current = this.newToken(TOKEN_NAME, result[1])
    return true
  }

  /**
   * 内置常量
   * @see const 例如 true false PI
   * @memberof TokenStream
   */
  isConst = (): boolean => {
    const first = this.getSomeCode()
    const keys = Object.keys(this.parser.consts)

    if(keys.map(k => k[0]).indexOf(first) === -1) return false

    const result = new RegExp(`(${keys.join('|')})`).exec(this.expression.substr(this.pos))

    if(result[1]){
      this.current = this.newToken(TOKEN_NAME, result[1])
      this.pos += result.length;
      return true
    }

    return false
  }

  /**
   * 分号
   * @see ;
   * @memberof TokenStream
   */
  isSemicolon =  () => {
    var first = this.getSomeCode();
    if (first === ';') {
      this.current = this.newToken(TOKEN_SEMICOLON, ';');
      this.pos++;
      return true;
    }
    return false;
  };

  /**
   * 圆括号
   * @see ;
   * @memberof TokenStream
   */
  isParenthesis =  () => {
    var first = this.getSomeCode(1);
    if (first === '(' || first === ')') {
      this.current = this.newToken(TOKEN_PAREN, first);
      this.pos++;
      return true;
    }
    return false;
  };

  /**
   * 判断是否操作符 
   * @see 操作符 + - * / || % ^ ? : . > < = >= <= | == === != !== 
   * @memberof TokenStream
   */
  isOperator = (): boolean => {
    const str = this.getSomeCode(3); // 操作符至多3位
    
    if(!str || /^(\w|\d)/.test(str)) return false
    operator.lastIndex = 0;
    const result = operator.exec(str)

    if(result && result[1]){
      this.pos += result[1].length
      this.current = this.newToken(TOKEN_OPERATOR, result[1])
      return true
    }
    return false
  }

  getCoordinates = (): { line: number, column: number } => {
    let line = 0;
    let column = 0;
    let index = -1;

    do {
      line++;
      column = this.pos - index;
      index = this.expression.substr(index + 1).indexOf('\n');
    } while ( index >= 0 && index < this.pos)

    return {
      line,
      column
    };
  };

  parseError =  (msg: string) =>{
    var coords = this.getCoordinates();
    throw new Error('parse error [' + coords.line + ':' + coords.column + ']: ' + msg);
  };

}