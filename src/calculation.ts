import Instruction, { INSTR_EXPRE, INSTR_VARNAME, INSTR_NAME, INSTR_OBJECT, INSTR_ARRAY, INSTR_FUNCALL, INSTR_MEMBER, INSTR_NUMBER, INSTR_VAR, INSTR_OPERA2, INSTR_PLAIN, INSTR_OPERA3, INSTR_OPERA1 } from './instruction';
import Ceval from './index';

/**
 * 运算
 * @export calculation
 * @param {Instruction[]} tokens    TokenQueue
 * @param {object} [values={}]      数据池
 * @param {Ceval} ceval             instance of eval
 * @param {boolean} [statis=false]  true全量返回 默认false
 * @returns result or result[]
 */
export default function calculation(tokens: Instruction[], values: object = {}, ceval: Ceval, statis = false) {
  if (window.name) {
    console.log('tokens: ', tokens);
  }
  const { unaryOps, binaryOps, ternaryOps } = ceval
  const stack = [];
  const { length } = tokens;

  let n1, n2, n3;
  let fn: undefined | Function

  for (let i = 0; i < length; i++) {
    const item = tokens[i];
    const { type, value } = item || {};

    if (!type) {
      stack.push(item)
      continue
    }

    if (type === INSTR_NUMBER || type === INSTR_PLAIN) {
      stack.push(value)
    } else if (type === INSTR_NAME) {
      if (Object.prototype.hasOwnProperty.call(values, value)) {
        // customVal
        stack.push(values[value])
      } else if (Object.prototype.hasOwnProperty.call(ceval.consts, value)) {
        stack.push(ceval.consts[value])
      } else {
        throw new Error(`${value} is not defined in values or consts`)
      }
    } else if (type === INSTR_OPERA1 && stack.length > 0) {
      // 一元运算，需要一个操作数
      [n1] = stack.splice(-1, 1);
      fn = unaryOps[value];
      stack.push(fn(n1));

    } else if (type === INSTR_OPERA2 && stack.length > 1) {
      // 二元运算，需要有两个操作数
      [n1, n2] = stack.splice(-2, 2)
      if (value === '||') {
        stack.push(n1 ? n1 : calculation([n2], values, ceval, statis)); // false || false || true
      } else if (value === '&&') {
        stack.push(n1 ? calculation([n2], values, ceval, statis) : false); // true && true && false
      } else {
        fn = binaryOps[value];
        stack.push(fn(n1, n2));
      }
    } else if (type === INSTR_OPERA3 && stack.length > 2) {
      // 三元运算，需要有三个操作数
      [n1, n2, n3] = stack.splice(-3, 3)
      if (value === '?') { // 三目运算
        stack.push(n1 ? n2 : n3);
      } else {
        fn = ternaryOps[value];
        stack.push(fn(n1, n2, n3));
      }
    } else if (type === INSTR_EXPRE) {
      stack.push(calculation(item.value as unknown as Instruction[], values, ceval, statis))
      // 表达式
    } else if (type === INSTR_MEMBER && stack.length > 0) {
      // 成员访问
      if(!value) { // a["b"]
        [n1, n2] = stack.splice(-2, 2);
        stack.push(n1[n2]);
        continue
      }
      n1 = stack.pop(); // a.b
      stack.push(n1[value])
    } else if (type === INSTR_ARRAY) {
      // 数组字面量
      stack.push(calculation(value, values, ceval, true))
    } else if (type === INSTR_OBJECT) {
      // 对象字面量
      const instr = {}
      Object.keys(value).forEach(key => {
        instr[key] = calculation(value[key], values, ceval)
      })
      stack.push(instr)
    } else if (type === INSTR_VAR) {
      // 赋值表达式
      // const _scope = {} TODO: 作用域
      // 临时方案，储存在values中
      [n1, n2] = stack.splice(-2, 2)
      let alreadyStatement = false
      if(
        Object.prototype.hasOwnProperty.call(ceval.consts, n2) ||
        Object.prototype.hasOwnProperty.call(values, n2)
      ){
        alreadyStatement = true
      }
      switch(value){
        case 'let':
        case 'const': {
          // let const的行为待定义
          if(alreadyStatement) {
            console.warn(`${n2} already statement in consts or values`)
          }
          break
        }
        case 'var': {
          values[n2] = n1;
          break
        }
        default: {
          console.warn('Unexpected claim identifier')
          break;
        }
      }
    } else {
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
  return statis ? stack : stack[0];
}
