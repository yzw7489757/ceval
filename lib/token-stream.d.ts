import { TypeToken, TypeCeval } from './interface';
/**
 * 语法解析
 * @class TokenStream
 */
export default class TokenStream {
    ceval: TypeCeval;
    expression: string;
    pos: number;
    current: null | TypeToken;
    savedPosition: number;
    savedCurrent: null | TypeToken;
    constructor(ceval: TypeCeval, expression: string);
    /**
     * @desc 适用语法校验检查
     * @memberof TokenStream
     */
    checkNextAccessGrammar: () => TypeToken;
    /**
     * @desc 某些情况下做正则优化，比如 operator 至多3位，所以截取3位再匹配
     * @param len 获取的长度
     * @param offset 位移
     * @see charAt与substr性能对比 https://jsperf.com/substr-or-charat
     * @memberof TokenStream
     */
    getSomeCode: (len?: number, offset?: number) => string;
    /**
     * @desc 获取首个单词
     * @memberof TokenStream
     */
    getFirstWord: () => string;
    /**
     * 创建新的fieldType实例
     * @memberof TokenStream
     */
    newToken: (type: string, value: any, pos?: number) => TypeToken;
    /**
     * 解析下一个 field
     * @memberof TokenStream
     */
    next: () => TypeToken;
    temporarySaved: () => void;
    restore: () => void;
    /**
     * 过滤空格 \t \r \n
     * @memberof TokenStream
     */
    isWhiteSpace: () => boolean;
    /**
     * 过滤注释 /*  *\/
     * @memberof TokenStream
     */
    isComment: () => boolean;
    /**
     * 过滤空格 \t \r \n
     * @memberof TokenStream
     */
    isBoolean: () => boolean;
    /**
     * 申明变量 TODO:support
     * @memberof TokenStream
     */
    isVariable: () => boolean;
    /**
     * 数字
     * @see 说明 需要考虑到 2进制0b10100 === 8进制024 === 10进制20 === 16进制0x14 === 10e0 === 20.000
     * @memberof TokenStream
     */
    isNumber: () => boolean;
    /**
     * 字符串
     * @see '' \'\' \"\" \"\'\'\"
     * @memberof TokenStream
     */
    isString: () => boolean;
    isFunctionDefined: () => boolean;
    /**
     * 变量，可能是名称
     * @see 遵循变量申明规范 可以以 $_ 开头，其他可以是 $_数字字母 ，排除保留字
     * @memberof TokenStream
     */
    isName: () => boolean;
    /**
     * 内置常量
     * @see const 例如 true false PI undefined null
     * @memberof TokenStream
     */
    isConst: () => boolean;
    /**
     * 分号
     * @see ;
     * @memberof TokenStream
     */
    isSemicolon: () => boolean;
    /**
     * 逗号,
     * @see ,
     * @memberof TokenStream
     */
    isComma: () => boolean;
    /**
     * 圆、方括号
     * @see ;
     * @memberof TokenStream
     */
    isParenthesis: () => boolean;
    /**
     * 判断是否操作符
     * @see 操作符 + - * / || % ^ ? : . > < = >= <= | == === != !== in
     * @memberof TokenStream
     */
    isOperator: () => boolean;
    /**
     * 获取当前character定位
     * @memberof TokenStream
     */
    getCoordinates: () => {
        line: number;
        column: number;
    };
    /**
     * 解析出错
     * @memberof TokenStream
     */
    parseError: (msg: string, ErrorType?: ErrorConstructor | SyntaxErrorConstructor | TypeErrorConstructor) => never;
}
