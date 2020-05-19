## Ceval

实现借鉴了 `expr-eval` 底层实现，重构为更适合表达式运算的 `Ceval`;

![alt=流程图](https://intranetproxy.alipay.com/skylark/lark/0/2020/jpeg/275580/1589874733619-57a7772a-1d43-4888-949a-bcea081b8e8e.jpeg)
## introduce

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
   * @desc 当没有返回值或为undefined时触发默认返回值
   * @type {any}
   */
  defaultReturnValues?: any = '' // done
})

```
## 基本

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
// var 申明语句不会影响到scope, 而是 inject 到 values 
// let 和 const 都赋值到当前 scope 上, 当前scope如果存在则warn
parseString(`
  function abs(a,b,c) { 
    var a = 5;
    let b = 1; /* warn */
    c = 2;
    const d = 4; /* not warn */
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

更多examples请移步测试用例。

## development

### develop
``` shell
npm start
```

### build
``` shell
npm run build
```

### publish
```shell
tnpm tpublish
```
