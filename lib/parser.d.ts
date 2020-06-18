import Ceval from './index';
import { TypeTokenStream, TypeToken, TypeInstruction } from './interface';
/**
 * 解析器
 * @export
 * @class Parser
 */
export default class Parser {
    ceval: Ceval;
    tokens: TypeTokenStream;
    /**
     * @desc 当前TOKEN指针
     */
    current: TypeInstruction | null;
    /**
     * @desc 暂存指针
     */
    savedCurrent: TypeInstruction | null;
    /**
     * @desc 下个TOKEN指针对象
     */
    nextToken: TypeToken | null;
    /**
     * @desc 暂存next TOKEN
     */
    savedNextToken: TypeToken | null;
    constructor(ceval: Ceval, tokens: TypeTokenStream, exprInstr: TypeInstruction[]);
    /**
     * 检查是否解析完毕
     */
    private inspectParseEnd;
    /**
     * 生成实例解析表达式，简化调用方式
     */
    static generatorParser: (parser: Ceval, tokens: TypeTokenStream, exprInstr: TypeInstruction[]) => Parser;
    /**
     * Token指针向下位移
     */
    next: () => TypeToken;
    /**
     * 条件是否命中Token真值
     */
    matchToken: (value: string | number | ((value: TypeToken) => boolean)) => boolean;
    /**
     * 预判是否符合预期，符合&&解析下个token
     * @param {type} 约定的类型
     * @param {value} 明确规定的字面值，比如 ] , =
     * @param {next} 允许next？
     */
    accept: (type: string, value?: any, next?: boolean) => boolean;
    /**
     * accpet + 断言
     * @param {type} 约定的类型
     * @param {value} 明确规定的字面值，比如 ] , =
     */
    expect: (type: string, value?: any) => never | boolean;
    /**
     * 暂存指针，在某些情况下单一的nextToken已经不满足预判情况，例如 typeof(add) || add(1, 2) || 1 + add;
     */
    temporarySaved: () => void;
    /**
     * 恢复指针
     */
    restore: () => void;
    /**
     * 解析表达式整个句柄
     * @see 如果只是求参或解析字面量，请从Conditional开始，因为MultipleEvaluation可能会误会语义，e.g.{a:1,b:2}中的“1,b:2”
     */
    parseExpression: (instr: TypeInstruction[]) => void;
    /**
     * 解析连续求值 例如 数组字面量 [1, 2, [3, 4, 5]]  (1, 2, 3)
     */
    parseMultipleEvaluation: (exprInstr: TypeInstruction[]) => void;
    /**
     * 解析变量赋值表达式 TOKEN_OPERATOR name = 1
     */
    parseAssignmentExpression: (exprInstr: TypeInstruction[]) => void;
    /**
     * 解析三目运算符
     */
    parseConditionalExpression: (exprInstr: TypeInstruction[]) => void;
    /**
     * 解析 ||
     */
    parseOrExpression: (exprInstr: TypeInstruction[]) => void;
    /**
     * 解析 &&
     */
    parseAndExpression: (exprInstr: TypeInstruction[]) => void;
    /**
     * 解析 ^ 按位异或
     */
    parseBitwiseOrExpression: (exprInstr: TypeInstruction[]) => void;
    /**
     * 解析 & 按位与
     */
    parseBitwiseAndExpression: (exprInstr: TypeInstruction[]) => void;
    /**
     * 解析判等 ['==', '===', '!=', '!==']
     */
    parseEqualExpression: (exprInstr: TypeInstruction[]) => void;
    /**
     * 解析比较运算符 ['<', '<=', '>=', '>']
     */
    parseCompareExpression: (exprInstr: TypeInstruction[]) => void;
    /**
    * 解析或运算符 ['||', '@'] @待补位
    */
    parseInOrAtExpression: (exprInstr: TypeInstruction[]) => void;
    /**
     * 解析按位移 [">>", ">>>", "<<"]
     */
    parseBitwiseMoveExpression: (exprInstr: TypeInstruction[]) => void;
    /**
     * 解析加减法 + -
     */
    parseAddOrSubExpression: (exprInstr: TypeInstruction[]) => void;
    /**
     * 解析乘除取模 * / %
     */
    parseMulOrDivExpression: (exprInstr: TypeInstruction[]) => void;
    /**
     * 解析一元运算符 [+, ++, +, -, !, ~, cos, tan, typeof]
     */
    parseUnaryExpression: (exprInstr: TypeInstruction[]) => void;
    /**
     * 外置函数调用
     */
    parseOuterFunctionCallExpression: (exprInstr: TypeInstruction[]) => void;
    /**
     * 解析内置函数调用
     */
    parsePersetFuncCallExpression: (exprInstr: TypeInstruction[]) => void;
    /**
     * 解析调用函数的实参
     */
    parseArguments: (exprInstr: TypeInstruction[]) => void;
    /**
     * 解析成员访问符 . []
     */
    parseMemberAccessExpression: (exprInstr: TypeInstruction[]) => void;
    /**
     * 解析字面值、字段值 number||string||operator(typeof cos tan)||[1,2,3]|| {a:1,b:{}} || (expression) || function abs() {}
     */
    parseField: (exprInstr: TypeInstruction[]) => void;
    /**
     * 解析对象字面量 { a: 1, b: 2, c: {}}
     */
    parseArrayLiteralDeclaration: (exprInstr: TypeInstruction[]) => void;
    /**
     * 解析对象字面量 { a: 1, b: 2, c: {}}
     */
    parseObjectLiteralDeclaration: (exprInstr: TypeInstruction[]) => void;
    /**
     * 解析函数声明
     */
    parseFunctionDefinedDeclaration: (expreInstr: TypeInstruction[]) => void;
    /**
     * 解析函数体, 花括号 { }, 应该视作一个新的作用域. // TODO: 可作为单独作用域体
     */
    parseFunctionBodyExpression: (exprInstr: TypeInstruction[]) => void;
    /**
     * 增加提示
     */
    printLog: (msg: string, tip: string, c?: Console["log" | "error" | "warn"]) => void;
}
