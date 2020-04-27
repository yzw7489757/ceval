import Token, { END, TSTRING, TNUMBER } from './token';
import { TypeToken, TypeCeval } from './interface';
import { whitespace, comment, string, number2bit, number8bit, number10bit, number16bit } from './regExp'

export default class TokenStream {
  // 当前指针
  pos = 0; 

  // 当前解析character
  current: null | TypeToken = null; 

  // 暂存指针
  savedPosition = 0;
  
  // 暂存解析character，在某些情况下做预判比如, cos是函数，cos() || map(cos) “cos)”可能被函数parser判定为语法错误
  savedCurrent: TypeToken = null; 

  constructor(public parser: TypeCeval, public expression: string) {
    console.log(this.parser)
  }
  
  getFirstCode = (offset?: number) => {
    return this.expression.charAt(this.pos + offset === undefined ? 0 : offset)
  }

  newToken = (type: string, value: any, pos?: number): TypeToken => {
    return new Token(type, value, pos != null ? pos : this.pos);
  }

  next = (): TypeToken => {
    if (this.pos >= this.expression.length) {
      return this.newToken(END, 'END');
    }

    if(this.isWhiteSpace() || this.isComment()) {
      return this.next()
    }else if(
      this.isNumber() || 
      this.isString()
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
    const matchWS = whitespace.exec(this.getFirstCode())
    while(matchWS && matchWS[1]){
      this.pos++
      return true
    }
    return false
  }
  
  /**
   * 过滤注释 /* 
   * @memberof TokenStream
   */
  isComment = (): boolean => {
    if(this.getFirstCode() === '/' && this.getFirstCode(1) === '*'){
      comment.lastIndex = 0;
      const matchResult = comment.exec(this.expression)
      if(matchResult && matchResult[1]){
        this.pos += matchResult[1].length + 2 + 2; // /*matchResult[1]*/
        return true
      }
    }
    return false
  }

  /**
   * 获取数字 
   * @see 说明 需要考虑到 2进制0b10100 === 8进制024 === 10进制20 === 16进制0x14 === 10e0 === 20.000
   * @memberof TokenStream
   */
  isNumber = (): boolean => {
    const first = this.getFirstCode()
    let number

    if(first === '0') {
      if(number2bit.test(this.expression)){
        // 2进制
        number2bit.lastIndex = 0;
        const bit2Result = number2bit.exec(this.expression)
        number = bit2Result ? bit2Result[1] : undefined;
      }else if(number8bit.test(this.expression)){
        // 8进制
        // @see 080 || 079 都是十进制  并非8进制
        number8bit.lastIndex = 0;
        const bit8Result = number8bit.exec(this.expression)
        number = bit8Result ? bit8Result[1] : undefined;
      }else if(number16bit.test(this.expression)){
        // 16进制 0xadf
        number16bit.lastIndex = 0;
        const bit16Result = number16bit.exec(this.expression)
        number = bit16Result ? bit16Result[1] : undefined;
      }else if(number10bit.test(this.expression)){
        // 十进制 .200 || 079 || 080 0b30
        number10bit.lastIndex = 0;
        const bit10Result = number10bit.exec(this.expression)
        number = bit10Result ? bit10Result[1] : undefined;
      }

      if(number === undefined){
        this.parseError('number bit parser Error')
        return false
      }
      
    }else if(number10bit.test(this.expression)){
        number10bit.lastIndex = 0;
        const bit10Result = number10bit.exec(this.expression)
        number = bit10Result ? bit10Result[1] : undefined;
    }

    if(!number) return false
    this.pos += number.length
    this.current = this.newToken(TNUMBER, parseFloat(number))

    return true
  }

  isString = (): boolean => {
    const first = this.getFirstCode()

    if(first === '\"' || first === '\'') {
      const matchString = string.exec(this.expression);
      if(matchString && matchString[1]){
        this.current = this.newToken(TSTRING, matchString[1], this.pos)
        this.pos += matchString[1].length;
        return true
      }
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