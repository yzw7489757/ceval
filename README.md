## Ceval

实现借鉴了 `expr-eval` 底层实现，重构为更适合表达式运算的 `Ceval`;

![alt=流程图](https://intranetproxy.alipay.com/skylark/lark/0/2020/jpeg/275580/1589874733619-57a7772a-1d43-4888-949a-bcea081b8e8e.jpeg)
## introduce

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

const result = analysis.parseString(`1+1`)

console.log(result); //2
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

