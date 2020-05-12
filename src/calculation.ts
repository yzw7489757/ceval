import Instruction, { INSTR_EXPRE, INSTR_FUNCALL, INSTR_MEMBER, INSTR_NUMBER, INSTR_VAR, INSTR_OPERA2, INSTR_PLAIN, INSTR_OPERA3, INSTR_OPERA1 } from './instruction';
import Ceval from './index';

export default function calculation(tokens: Instruction[], values: object = {}, ceval: Ceval) {
  console.log('tokens: ', tokens);
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
    }

    if (type === INSTR_NUMBER || type === INSTR_PLAIN) {
      stack.push(value)
    } else if (type === INSTR_VAR) {
      if (Object.prototype.hasOwnProperty.call(values, value)) {
        // customVal
        stack.push(values[value])
      } else if (Object.prototype.hasOwnProperty.call(ceval.consts, value)) {
        stack.push(ceval.consts[value])
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
        stack.push(n1 ? n1 : calculation([n2], values, ceval)); // false || false || true
      } else if (value === '&&') {
        stack.push(n1 ? calculation([n2], values, ceval) : false); // true && true && false
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
      stack.push(calculation(item.value as unknown as Instruction[], values, ceval))
      // 表达式
    } else if (type === INSTR_MEMBER && stack.length > 0) {
      // 成员访问 a.b b依赖于a
      [n1] = stack.splice(-1, 1);
      stack.push(n1[value]);
    } else {
      //  
    }
  }
  return stack[0];

}
