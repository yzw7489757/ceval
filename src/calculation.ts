import Instruction, { INSTR_EXPRE, INSTR_FUNCDEF, INSTR_EXECUTBODY, INSTR_VARNAME, INSTR_NAME, INSTR_OBJECT, INSTR_ARRAY, INSTR_FUNCALL, INSTR_MEMBER, INSTR_NUMBER, INSTR_VAR, INSTR_OPERA2, INSTR_PLAIN, INSTR_OPERA3, INSTR_OPERA1 } from './instruction';
import Ceval from './index';
import { hasAttribute, mapToObject, merge, someCondition, getReference, Reference } from './utils/index';

/**
 * 运算
 * @export calculation
 * @param {Instruction[]} tokens    TokenQueue
 * @param {object} [values={}]      数据池
 * @param {Ceval} ceval             instance of eval
 * @param {boolean} [statis=false]  true全量返回 默认false
 * @param {object} [scope={}]       作用域
 * @returns result or result[]
 */
export default function calculation(tokens: Instruction<any>[], values = Object.create(null), ceval: Ceval, statis = false, scope = Object.create(null)) {
  // if (window && window.name) {
  //  console.group('calclation Dev')
  //   console.log('tokens: ', tokens);
  //   console.log('values', values)
  //   console.log('scope', scope)
  //  console.groupEnd()
  // }
  const options = ceval.getOptions();
  const { unaryOps, binaryOps, ternaryOps } = ceval
  const stack = [];
  const { length } = tokens;
  let n1, n2, n3;
  let fn: undefined | Function | Instruction<CustomFunc>
  for (let i = 0; i < length; i++) {
    const item = tokens[i];
    const { type, value } = item || {};

    if (!type) {
      stack.push(item)
      continue
    }
    switch(type) {
      case INSTR_NUMBER: 
      case INSTR_PLAIN:
      case INSTR_VARNAME: {
        stack.push(value);
        break
      }
      case INSTR_NAME: {
        // 变量名称，范围作用域有functions consts values _scope 后者优先
        if (hasAttribute(scope, value)) {
          // scope,作用域
          stack.push(scope[value])
        } else if (hasAttribute(values, value)) {
          // customVal
          stack.push(values[value])
        } else if (hasAttribute(ceval.consts, value)) {
          // 常量
          stack.push(ceval.consts[value])
        } else if(hasAttribute(ceval.functions, value)) {
          // 内置函数
          stack.push(ceval.functions[value])
        } else {
          throw new Error(`${value} is not defined in values or consts`)
        }
        break
      }
      case INSTR_OPERA1: {
        if(stack.length === 0) break;
        // 一元运算，需要一个操作数
        [n1] = stack.splice(-1, 1);
        fn = specifyAttr<Function>(value, [values, unaryOps], options.allowOperatorsCovered)
        
        stack.push(fn(n1));
        // 当操作符是return 时，终止该运算循环
        if(value === 'return') {
          i = length
        }
        break
      }
      case INSTR_OPERA2: { // 二元运算，需要有两个操作数
        if(stack.length < 2) break;
        [n1, n2] = stack.splice(-2, 2)
          fn = specifyAttr<Function>(value, [values, binaryOps], options.allowOperatorsCovered)
        if (value === '&&') { // 1&&0&&3可能是连续的
          stack.push(fn(n1, calculation([n2], values, ceval, statis, scope), false)); // true && true && false
        } else if (value === '=') {
          // 写操作分为属性赋值和引用赋值
          if(n1 instanceof Reference) { // left hide 为引用
            n1.setValue(n2);
            n1.destory();
          } else {
            someCondition(hasAttribute(scope, n1), hasAttribute(values, n1), `${n1} is not define in values or current scope, if you are declaring a new variable, please add var, const or let operator`)
            fn(n1, n2, hasAttribute(scope, n1) ? scope : values)
          // 如果当前作用域含有该属性，作用域优先
          }
        } else {
          stack.push(fn(n1, (typeof n2 === 'string' || typeof n2 === 'number') ? n2: calculation([n2], values, ceval, statis, scope), options));
        }
        break
      }
      case INSTR_OPERA3: { // 三元运算，需要有三个操作数
        if(stack.length < 3) break;
        [n1, n2, n3] = stack.splice(-3, 3)
        fn = specifyAttr<Function>(value, [values, ternaryOps], options.allowOperatorsCovered)
        stack.push(fn(n1, n2, n3));
        break
      }
      case INSTR_EXPRE: { // 表达式
        stack.push(calculation(item.value, values, ceval, statis, scope))
        break;
      }
      case INSTR_MEMBER: { // 成员访问
        // 有可能是读，也有可能是写；
        const nextItem = tokens[i+2]; // 解析顺序 INSTR_MEMBER => INSTR_EXPRE => INSTR_OP2
        const keys = calculation(value, values, ceval, true, scope)
        const ref = getReference(keys, scope, values)
        
        if(nextItem && nextItem.type === INSTR_OPERA2 && nextItem.value === '=') {
          // 写操作, JavaScript是拿不到引用的，push到stack，等待引用赋值
          stack.push(ref)
        } else {
          stack.push(ref.getValue())
          ref.destory();
        }
        
        break
      }
      case INSTR_ARRAY: { // 数组字面量
        stack.push(calculation(value, values, ceval, true, scope))
        break
      }
      case INSTR_OBJECT: { // 对象字面量
        const instr = Object.create(null)
        Object.keys(value).forEach(key => {
          instr[key] = calculation(value[key], values, ceval, statis,scope)
        })
        stack.push(instr)
        break
      }
      case INSTR_VAR: { // 赋值语句
        [n1, n2] = stack.splice(-2, 2)
        switch (value) {
          case 'let':
          case 'const': {
            // let const的行为待定义, let 和 const 应该挂载到作用域上，而var 可以赋给 values 
            // TODO: 需要判定assgin给scope还是values
            if (hasAttribute(scope, n1)) {
              console.warn(`${n1} already statement in consts or scope`)
            }
            scope[n1] = n2;
            break
          }
          case 'var': {
            values[n1] = n2; 
            break
          }
          default: {
            console.warn('Unexpected statement identifier')
            break;
          }
        }
        break
      }
      case INSTR_FUNCALL: { // 自声明函数调用，区分是外部函数还是内声明函数
        const args = stack.splice(-value, value);
        fn = stack.pop();
        // if(args.length !== value) {} // TODO: 参数不够的情况 warning
        if (typeof fn === 'function') {
          // 外置函数，即在consts内声明的
          stack.push(fn.apply(null, args))
          continue
        } else if(fn.value instanceof CustomFunc) { // 内置函数
          fn.value.updateScope(args)
          stack.push(fn.value.invokeBody())
        }
        break
      }
      case INSTR_FUNCDEF: { // 函数定义
        if (typeof value !== 'string') {
          stack.push(value); // 函数体
          continue
        }
        if (stack.length === 0) return
        const _scope = merge(Object.create(null), scope); // 作用域
  
        // done: 嵌套函数区分, 挂载到当前_scope上
        _scope[value] = new Instruction<CustomFunc>(INSTR_EXECUTBODY, new CustomFunc(stack.pop(), values, _scope, ceval))
  
        Object.assign(scope, _scope)
        break
      }
      default: {
        const _val = Symbol('_init') // 值可能就是undefined，做区分
        let val = _val
        try {
          val = item.value
        } catch (e) {
          // item = undefined | null | false | true ....
        }
        if (val !== _val) {
          stack.push(val)
        }
      }
    }
  }
  return statis ? stack : stack[0];
}

function specifyAttr<T>(value: string, [customValues, defaultValues], shouldCustom = false): T {
  let fn: T
  if(shouldCustom && hasAttribute(customValues, value)) {
    fn = customValues[value] as T;
  } else {
    fn = defaultValues[value] as T;
  }
  return fn
};

// class Data {
//   constructor()
// }

class CustomFunc {
  args: string[];

  constructor(public func: Instruction<any>[], public values: Record<string, any>, public _scope: Record<string, any>, public ceval: Ceval) {
    const args = this.func.splice(0, func.length - 1)
    this.args = calculation(args, mapToObject(args, (k) => k), ceval, true)
    this._scope = merge(mapToObject(args), _scope);
  }

  updateScope = (scope: any[]) => {
    // 假设 Object attribute 是不保证顺序的。
    this.args.forEach((key, index) => {
      if(hasAttribute(this._scope, key)) {
        this._scope[key] = scope[index]
      }
    });
  }

  invokeBody = () => {
    return calculation(this.func, this.values, this.ceval, false, this._scope)
  }
}
