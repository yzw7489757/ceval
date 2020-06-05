import { TypeUnary, TypeBinary, TypeTernary, TypeConst, TypeFunction } from './systemMap';
import { CevalOptions } from './interface';
export default class Ceval {
    private options;
    unaryOps: TypeUnary;
    binaryOps: TypeBinary;
    ternaryOps: TypeTernary;
    consts: TypeConst;
    functions: TypeFunction;
    /**
     * 操作符映射表，可做在presetValues覆盖运算
     */
    operatorMap: any;
    private currentValues;
    constructor(options?: Readonly<CevalOptions>);
    /**
     * 查询支持的操作符方法名称, 可做覆盖
     * @param ops 操作符
     * @memberof Ceval
     */
    getSupportOperationMap: (ops: string) => null | Function;
    /**
     * 解析字符串，对外暴露方法
     * @memberof Ceval
     */
    parseString: (expression: string, values?: Record<string, any>) => any;
    /**
     * 获取当前数据池 预置+外置+内声明
     * @returns 数据池
     * @memberof Ceval
     */
    getCurrentValues: () => Record<string, any>;
    /**
     * 传入指令集开始计算
     * @param {tokens} Instruction[] 指令集
     * @param {Record<string, any>} [values={}] 数据池
     * @memberof Ceval
     */
    private injectValueToCalc;
    /**
     * Update PresetValues
     * @param {values} Record<string, any> 配置
     * @memberof Ceval
     */
    updatePresetValues: (values: Record<string, any>) => void;
    /**
     * Update Option
     * @param {Options} CevalOptions 配置
     * @memberof Ceval
     */
    updateOptions: (Options: Partial<CevalOptions>) => void;
    /**
     * get Options
     * @memberof Ceval
     */
    getOptions: () => Readonly<CevalOptions>;
}
