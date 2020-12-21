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

## 使用

``` shell
npm i ceval -S
```

## 介绍
### Options
``` ts
const Parser = require('ceval')
const analysis = new Parser({
   /**
   * @desc 允许使用操作符，不建议改
   * @type {boolean}
   */
  endableOperators?: boolean = true;

  /**
   * @desc 十进制，默认启用多进制，支持二、八、十六进制
   * @type {boolean}
   */
  endableBitNumber?: boolean = true;

  /**
   * @desc 允许访问成员 例如 a.b a['b']
   * @type {boolean}
   */
  allowMemberAccess?: boolean = true;

  /**
   * @desc 默认情况下允许放大计算
   * @see 以兼容处理算术结果 e.g 0.1+0.2 !== 0.3  || 1.0-0.9 !== 0.1
   * 边界计算（n > Number.MAX_SAFE_INTEGER || n < Number.MIN_SAFE_INTEGER）不会做处理
   * @requires false 
   * @type {boolean}
   */
  allowHandleNumberPrecision?: boolean = true;

  /**
   * @desc 默认情况下，不允许预设值覆盖运算符
   * @see 在某些情况下，如果你希望进行更精确的计算，例如 BigInt、presetValue = {'+': (a, b) => (a+b)|0 }
   * @requires false
   * @type {boolean}
   * @memberof CevalOptions
   */
  allowOperatorsCovered?: boolean;

  /**
   * @desc 当没有返回值或未定义时触发默认返回值
   * @type {any}
   */
  defaultReturnValues?: any = '' // done
})
```

## API
Parser 实例API

| api | desc | type |
| --- | --- | --- |
| operatorMap | 运算符映射表，可用于覆盖预置值操作 | Record<string, Function>|
| getSupportOperationMap | 查询支持的运算符方法的名称,以支持operatorMap修改 | (ops: string) => null \| Function;| 
| parseString | 解析字符串 | (expression: string, values?: Record<string, any>) => any;|
| getCurrentValues | 获取当前数据池预置+外部+内部声明变量 | () => Record<string, any> |
| updatePresetValues| 更新预设值 |(values: Record<string, any>) => void|
| updateOptions| 更新Options | (Options: Partial\<CevalOptions>) => void|
| getOptions| 获取Options | () => Readonly\<CevalOptions>|

关于Options示例 [test case](https://github.com/yzw7489757/ceval/blob/master/test/options.test.js);

通过 [TC29/test262](https://github.com/tc39/test262/tree/master/test/language) 大部分测试用例;

## 规则

只有两条规则：

### 结尾分号

e.g.
``` ts
parse('0b01 + 0b01;') // 2 
```
虽然在一个简单表达式操作中没必要那么麻烦，但确实是一个好习惯。Parser可以准确地知道结尾在哪里，没有什么限制。

e.g.
```ts
parse(`
  function abs(a,b,c) { 
    let b = 1 /* ⚠️ error, must has semicolon */
    c = 2;
    return(a+b+c);
  };
  abs(3,4,8);
`)
```

### 变量
由var句柄申明的变量不影响 "scope"，会被放到全局数据池中。
而 "let" 和 "const" 只会分配给当前作用域，如果当前作用域存在则发出警告。但仍然执行复制成功，后续将处理为无视该赋值行为，该变量仍然是赋值前的值。

TODO: 这是个纠结的点，如果你有什么建议欢迎提出。
``` ts
var Parser = require('ceval');

var instance = new Parser({/*...*/});
var parse = instance.parseString;

parse(`
  var obj = { foo:'foo', bar: 'bar'};

  function abs(a,b,c) {
    var d = 'global';
    return (a+b+c);
  }
  abs(1,2,3)
`)

console.log(instance.getCurrentValues().obj); // { foo:'foo', bar: 'bar'}
console.log(instance.getCurrentValues().d); // 'global'

parse(`
  let foo = 'foo';
  const bar = 'bar';
  function abs(a,b,c) {
    let d = 'scope';
    const e = 'scope';
    return (a+b+c);
  }
  abs(1,2,3)
`)
console.log(instance.getCurrentValues().foo); // undefined
console.log(instance.getCurrentValues().bar); // undefined
console.log(instance.getCurrentValues().d); // undefined
console.log(instance.getCurrentValues().e); // undefined
```

## 基本

``` ts
const { parse: parse } = analysis
```

### Number
``` ts
parse('0b01') // 1
parse('0b11') // 3
parse('0b010101') // 21

parse('01') // 1
parse('077') // 63
parse('01111') // 585

parse('.1') // 1
parse('33') // 33
parse('100.00') // 100

parse('0x01') // 1
parse('0xaf') // 175
parse('0x9fac') // 40876

parse(`1e+308*2 === Infinity`) // true

parse(`
    var x = NaN;
    var y = NaN;
    return (x !== y);
  `) // true

parse(`
  var x = NaN;
  return(typeof(x) === 'number');
  `) // true

parse(`
  var x = NaN;
  var x_geq_0=(x >= 0.0);
  return(x_geq_0)
  `) // false

parse(`
  var x=+Infinity;
  return(typeof(x) === 'number')
  `) // true
```
More testcase [here](https://github.com/yzw7489757/ceval/blob/master/test/number.test.js)

### 运算
``` ts
const obj = `{ a: 1, b: 2, c: 3, d: { e: 4, f: 5}}`
parse(`1+1`);                       // 2
parse(`-1-2-3`);                    // -6
parse(`1*2*3`);                     // 6
parse(`1/2/4`);                     // 0.125
parse(`undefined || 2`);            // 2
parse(`~-1 || -2 || 3`);            // -2
parse(`-0 == +0`);                  // true
parse(`~1 > 1`);                    // false
parse(`false > false > 1`);         // false
parse(`5 >= 0`);                    // true
parse(`1 in [1, 2, 3]`);            // true
parse(`undefined in [1, 2, true]`); // false
parse(`'a' in ${obj}`);             // true
parse(`\'\'a\'\' in ${obj}`);       // true ('"a"'  === 'a') is Palindrome
parse(`1 === true`);                // false
parse(`3%2`);                       // 1
```

### Function
``` ts
parse(`
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
parse(`[1*2, false, true, undefined, null]`); // Array[]
parse(`var a = { b: { c: ['a','b','c','d']} };'e' in a.b.c`); // false
parse(`{ a: 1, b: 2, c: { d: undefined, e: { f: false, g: { h: null }}}}`); // object

parse(`var a = { b: 2 };a.b`) //2;
parse(`var a = { b: 2 };a["b"]`) //2;
parse(`var a = { b: 2, c:3 };var b='c';a[b]`) //3;

// data reference
parse(`
  var a = { b: 2, c:[1,2,3]};
  var b='c';
  a[b][0] = '0';
  return a[b];
`) // ['0',2,3]

parse(`
  var arr = [1,2,3];
  arr[0] = 0;
  return arr;
`) // [0,2,3]
```

### Variable

``` ts
parse(`
var a = { foo: 1 };
var b = { bar: 2 };
let a = { state: 1 } // ⚠️, Raise warning, current scope exists key
const b = { state: 1 } // ⚠️, Raise warning, current scope exists key

let c = { coo: 1} // success;
const d = { coo: 1} // success;
`)

parse(`
var a = { a: [false, true, undefined, null, ''] };
var b = { b: true, c: undefined, d:{ e: a, f: '1', g: {}}};
`) // Can be obtained from the instance. api: getCurrentValues
```
### this
<!-- TODO: 考虑加入中，仍是个可选的功能。 -->

### 操作符
通过`instance.operatorMap`获取所有操作符；

#### return 
`return` 中断当前操作轮询；但它不影响外部。
``` ts
parse(`
return 1;
return 2;
`) // 1

parse(`
  var foo = 'foo'
  function abs(a,b,c) {
    return a;
    return b;
  }
  var bar = abs(1,2,3)
  return (bar + foo);
`) // foo1
```

### 其他

请转到测试用例以了解更多信息 [examples](https://github.com/yzw7489757/ceval/tree/master/test)。

### TODO: [Test39](https://github.com/tc39/test262/tree/master/test/language/types) 一些测试用例.
#### speed of progress
2020-06-24 done: number, null, boolean

更多功能扩展中，欢迎参与或提出feature。

## development

### develop
``` shell
npm start
```

### build
``` shell
# webapck build umd module, No compression
npm run build:umd

# rollup build umd module, Compressed version
npm run build:rollup

# webpack build docs
npm run build:docs
```

### publish
```shell
npm publish
```

