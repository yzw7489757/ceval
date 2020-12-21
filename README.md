## Ceval

![](https://img.shields.io/npm/dm/ceval?style=flat-square)
<!-- ![](https://img.shields.io/npm/l/ceval) -->
<!-- ![](https://img.shields.io/npm/v/ceval) -->
![](https://img.shields.io/travis/yzw7489757/ceval?label=Travis%20Build)
![CI](https://github.com/yzw7489757/ceval/workflows/CI/badge.svg?branch=master)
![Node.js CI](https://github.com/yzw7489757/ceval/workflows/Node.js%20CI/badge.svg)
<!-- ![](https://img.shields.io/github/size/yzw7489757/ceval/lib/index.js) -->

[online demo](https://yzw7489757.github.io/ceval/);

[中文文档](./README-ZH.md)
零依赖，适合表达式运算; 

No dependence, suitable for calculating expressions; 

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
### Options
``` ts
const Parser = require('ceval')
const analysis = new Parser({
   /**
   * @desc Allow operators
   * @type {boolean}
   */
  endableOperators?: boolean = true;

  /**
   * @desc number enable multi bit base
   * @type {boolean}
   */
  endableBitNumber?: boolean = true;

  /**
   * @desc Allow access to members
   * @type {boolean}
   */
  allowMemberAccess?: boolean = true;

  /**
   * @desc Zoom in calculation allowed by default
   * @see To process the results of arithmetic e.g 0.1+0.2 !== 0.3  || 1.0-0.9 !== 0.1
   * Beyond the boundary（ta > Number.MAX_SAFE_INTEGER || ta < Number.MIN_SAFE_INTEGER）will not do processing, restore arithmetic
   * @requires false 
   * @type {boolean}
   */
  allowHandleNumberPrecision?: boolean = true;

  /**
   * @desc Operators are not allowed to be overridden by presetvalue by default
   * @see In some cases, developers want to make more accurate calculations, such as BigInt, presetValue={'+':Function}
   * @requires false
   * @type {boolean}
   * @memberof CevalOptions
   */
  allowOperatorsCovered?: boolean;

  /**
   * @desc Trigger default return value when there is no return value or undefined
   * @type {any}
   */
  defaultReturnValues?: any = '' // done
})
```

## API
Parser Instance API

| api | desc | type |
| --- | --- | --- |
| operatorMap | Operators mapping table, which can be used in preset values overlay operation | Record<string, Function>|
| getSupportOperationMap | The name of the operator method supported by the query can be overridden | (ops: string) => null \| Function;| 
| parseString | Parsing strings, exposing methods to the outside world | (expression: string, values?: Record<string, any>) => any;|
| getCurrentValues | Get current datapool preset + external + internal declaration | () => Record<string, any> |
| updatePresetValues| Update PresetValues |(values: Record<string, any>) => void|
| updateOptions| Update Option | (Options: Partial\<CevalOptions>) => void|
| getOptions| get Options | () => Readonly\<CevalOptions>|

about Options example [test case](https://github.com/yzw7489757/ceval/blob/master/test/options.test.js);

use [test262](https://github.com/tc39/test262/tree/master/test/language) test case;

## rule

There are two rules:

### Semicolon at the end

e.g.
``` ts
parse('0b01 + 0b01;') // 2 
```
Although it is not necessary in a simple expression operation, but it's a good habit.The parser can know exactly where the end is, Although it doesn't have too many restrictions.

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

### statement
"var" statement does not affect "scope", it's inserted into values 
"let" and "const" assigned to the current scope, warn if the current scope exists

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

## basic

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

### calculation
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

### Operator
Through `instance.operatorMap` Get all operators；

#### return 
`return` interrupt this operation cycle; but it doesn't affect the outside world.
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

### Other

Please move to test case for more [examples](https://github.com/yzw7489757/ceval/tree/master/test)。

### TODO: [Test39](https://github.com/tc39/test262/tree/master/test/language/types) Some test cases, 
#### speed of progress
2020-06-24 done: number, null, boolean

In more function extension, welcome to participate or propose feature.

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

