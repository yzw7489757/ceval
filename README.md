## Ceval

![](https://img.shields.io/npm/dt/ceval?style=flat-square)
![](https://img.shields.io/npm/dm/ceval?style=flat-square)
![](https://img.shields.io/npm/dw/ceval?style=flat-square)
![](https://img.shields.io/npm/l/ceval)
![](https://img.shields.io/npm/v/ceval)
![](https://img.shields.io/github/issues/yzw7489757/ceval)
![CI](https://github.com/yzw7489757/ceval/workflows/CI/badge.svg?branch=master)
![Node.js CI](https://github.com/yzw7489757/ceval/workflows/Node.js%20CI/badge.svg)
![](https://img.shields.io/github/size/yzw7489757/ceval/lib/index.js)
![](https://img.shields.io/travis/yzw7489757/ceval?label=Travis%20Build)

[online demo](https://yzw7489757.github.io/ceval/);

零依赖，适合表达式运算; 

No dependence, the achieve basics `expr-cval`, Refactoring to ceval is more suitable for calculating expressions; 


``` ts
┌───────────────────────────────┐
│                               │
│   Destination: lib/index.js   │
│   Bundle Size:  21.92 KB      │
│   Minified Size:  21.89 KB    │
│   Gzipped Size:  6.76 KB      │
│                               │
└───────────────────────────────┘
```

## usage

``` shell
npm i ceval -S
```

## introduce

![alt=流程图](https://user-images.githubusercontent.com/28922129/83138027-c5541680-a11c-11ea-9ef4-aa2ddfa3884b.png)

### Options
``` ts
const Parser = require('ceval')
const analysis = new Parser({
   /**
   * @desc 允许使用运算符
   * @type {boolean}
   */
  endableOperators?: boolean = true;

  /**
   * @desc 允许启用多位进制Number
   * @type {boolean}
   */
  endableBitNumber?: boolean = true;

  /**
   * @desc 允许访问成员
   * @type {boolean}
   */
  allowMemberAccess?: boolean = true;

  /**
   * @desc 默认允许放大计算，以处理四则运算的结果 e.g 0.1+0.2 !== 0.3  || 1.0-0.9 !== 0.1
   * 在超出边界的情况下（ta > Number.MAX_SAFE_INTEGER || ta < Number.MIN_SAFE_INTEGER）会不做处理，还原四则运算
   * @requires false 
   * @type {boolean}
   */
  allowHandleNumberPrecision?: boolean = true;

  /**
   * @desc 默认不允许操作符被 presetValue 覆盖
   * @see 某些情况下开发者想制定更加精确的计算,例如BigInt,那么就在根据operatorMap声明presetValue={'+':Function}
   * @requires false
   * @type {boolean}
   * @memberof CevalOptions
   */
  allowOperatorsCovered?: boolean;

  /**
   * @desc 当没有返回值或为undefined时触发默认返回值
   * @type {any}
   */
  defaultReturnValues?: any = '' // done
})
```

## API
Parser Instance API

| api | desc | type |
|----|----|----|----|
| operatorMap | Operators mapping table, which can be used in preset values overlay operation | Record<string, Function>|
| getSupportOperationMap | The name of the operator method supported by the query can be overridden | (ops: string) => null | Function;| 
| parseString | Parsing strings, exposing methods to the outside world | (expression: string, values?: Record<string, any>) => any;|
| getCurrentValues | Get current datapool preset + external + internal declaration | () => Record<string, any> |
| updatePresetValues| Update PresetValues |(values: Record<string, any>) => void|
| updateOptions| Update Option | (Options: Partial<CevalOptions>) => void|
| getOptions| get Options | () => Readonly<CevalOptions>|

about Options example [test case](https://github.com/yzw7489757/ceval/blob/master/test/options.test.js);

use [test262](https://github.com/tc39/test262/tree/master/test/language) test case;
## basic

``` ts
const { parseString } = analysis
```

### Number
``` ts
parseString('0b01') // 1
parseString('0b11') // 3
parseString('0b010101') // 21

parseString('01') // 1
parseString('077') // 63
parseString('01111') // 585

parseStrin('.1') // 1
parseStrin('33') // 33
parseStrin('100.00') // 100

parseString('0x01') // 1
parseString('0xaf') // 175
parseString('0x9fac') // 40876
```

### 运算
``` ts
const obj = `{ a: 1, b: 2, c: 3, d: { e: 4, f: 5}}`
parseString(`1+1`);                       // 2
parseString(`-1-2-3`);                    // -6
parseString(`1*2*3`);                     // 6
parseString(`1/2/4`);                     // 0.125
parseString(`undefined || 2`);            // 2
parseString(`~-1 || -2 || 3`);            // -2
parseString(`-0 == +0`);                  // true
parseString(`~1 > 1`);                    // false
parseString(`false > false > 1`);         // false
parseString(`5 >= 0`);                    // true
parseString(`1 in [1, 2, 3]`);            // true
parseString(`undefined in [1, 2, true]`); // false
parseString(`'a' in ${obj}`);             // true
parseString(`\'\'a\'\' in ${obj}`);       // true
parseString(`1 === true`);                // false
parseString(`3%2`);                       // 1
```

### Function
``` ts
// var 申明语句不会影响到 scope, 而是 inject 到 values 
// let 和 const 都赋值到当前 scope 上, 当前scope如果存在则warn

parseString(`
  function abs(a,b,c) { 
    var a = 5; /* => inject to presetValues */
    let b = 1; /* => inject to current scope */
    c = 2;
    const d = 4; /* If the current scope contains the variable D, It will trigger warning, but the operation will still be completed, is overlay */
    return(a+b+c);
  };
  abs(3,4,8);
`)
``` 

### Object & Array
``` ts
parseString(`[1*2, false, true, undefined, null]`); // Array[]
parseString(`var a = { b: { c: ['a','b','c','d']} };'e' in a.b.c`); // false
parseString(`{ a: 1, b: 2, c: { d: undefined, e: { f: false, g: { h: null }}}}`); // object
```

### Variable

``` ts
parseString(`
var a = { a: 2 };
var b = { b: a };
`)

parseString(`
var a = { a: [false, true, undefined, null, ''] };
var b = { b: true, c: undefined, d:{ e: a, f: '1', g: {}}};
`)
```

### Other

更多examples请移步测试用例。

TODO: [Test39](https://github.com/tc39/test262/tree/master/test/language/types) 部分测试用例

更多功能扩展中，欢迎提出 feature 和 参与。

## development

### develop
``` shell
npm start
```

### build
``` shell
# webapck build umd module, 无压缩
npm run build:umd

# rollup build umd module, 压缩版本
npm run build:rollup

# webpack build docs
npm run build:docs
```

### publish
```shell
npm publish
```

