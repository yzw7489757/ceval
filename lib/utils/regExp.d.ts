export declare const whitespaceReg: RegExp;
export declare const commentReg: RegExp;
export declare const stringReg: RegExp;
export declare const stringGreedyReg: RegExp;
export declare const number2bitReg: RegExp;
export declare const number8bitReg: RegExp;
export declare const number010bitReg: RegExp;
export declare const number10bitReg: RegExp;
export declare const number16bitReg: RegExp;
export declare const numberEbitReg: RegExp;
export declare const variableReg: RegExp;
export declare const operatorReg: RegExp;
export declare const unaryMapReg: RegExp;
export declare const unarySymbolMapReg: RegExp;
export declare const constsMapReg: RegExp;
export declare const execFactoryReg: (reg: RegExp, expr: string, cb?: <T>(v: T) => T) => string | undefined;
export declare const isUnaryOpeator: ({ value }: {
    value: any;
}) => any;
export declare const isBinaryOpeator: ({ value }: {
    value: any;
}) => any;
export declare const isTernaryOpeator: ({ value }: {
    value: any;
}) => any;
