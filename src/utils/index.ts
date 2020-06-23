import Instruction from '../instruction';

const { toString } = Object.prototype;


export function isObject(obj): obj is object {
  return toString.call(obj) === '[object Object]'
}

/**
 * @export
 * @template T
 * @param {array|object|string} source 
 * @param {string} value
 * @returns {boolean}
 */
export function contains(source: any[] | Record<any, any> | string, value: string): boolean {
  if (isObject(source)) {
    return Object.prototype.hasOwnProperty.call(source, value)
  } else if (Array.isArray(source)) {
    return source.some(v => v === value)
  }
  return source.indexOf(value) > -1
}

/**
 * 获取日期时间
 * @export getTime
 * @param {number} [offset=0] 偏移量
 * @returns {string[]} [date, time]
 */
export function getTime(offset = 0): string[] {
  const o = new Date(Date.now() + offset);
  const date = `${o.getFullYear()}-${o.getMonth() + 1}-${o.getDate()}`
  const clock = `${o.getHours()}:${o.getMinutes()}:${o.getSeconds()}`.replace(/\d+/g, (t) => {
    return parseInt(t, 10) < 10 ? `0${t}` : t
  })

  return [date, clock]
}


/**
 * 递归foreach
 * @export mapVal
 * @template T
 * @param {T} data
 * @param {Record<string, Record<string, any>>} object
 * @param {(data: T, key:string, val: any) => void} cb
 * @returns
 */
export function mapVal<T extends object>(data: T, object: object, cb: (data: T, key: string, val: any) => void) {
  Object.keys(object).map(key => {
    return isObject(object[key]) ? mapVal(data, object[key], cb) : cb(data, key, object[key])
  })
  return data
}

/**
 * 前者为主，仅合并不存在属性
 * @template T object
 * @param {T} target
 * @param {T} source
 */
export function merge<T>(target: T, source: T) {
  Object.keys(source).forEach(key => {
    const val = source[key]
    if (Object.prototype.hasOwnProperty.call(target, key)) return
    if (Array.isArray(val)) {
      merge(target[key] = [], val)
    } else if (isObject(val)) {
      merge(target[key] = {}, val)
    } else {
      target[key] = val
    }
  })
  return target
}

/**
 * 替换\'\' \"\" 在 处理 in operator 需要到
 * @param {string} str string Field
 * @returns {string} 没有对称引号的字符串
 */
export function eliminateQuote(str: string): string {
  const quoteReg = /^\"(.*)\"$|^\'(.*)\'$/;
  if (!quoteReg.test(str)) return str
  const result = quoteReg.exec(str)
  const s = result[1] !== undefined ? result[1] : result[2]
  return eliminateQuote(s)
}
/**
 * 回文字符串 \'\'a\'\' ✅  \'\'a\'❌
 * @param {string} str
 * @returns
 */
export function isPalindrome(str: string) {
  let i = 0
  while (contains(['\'', '\"'], str.charAt(i)) && str.charAt(i) === str.charAt(str.length - 1 - i)) {
    i++
  }
  const surplusStr = str.substring(i, str.length - i)
  return surplusStr.indexOf('\"') === -1 && surplusStr.indexOf('\'') === -1
}

/**
 * 返回首个有效数据， 非undefined null false true
 * @param {*} args
 */
export function filterUndefine(...args) {
  let one
  args.some(item => {
    if (contains([undefined, null, true, false], item)) return false
    one = item
    return true;
  })
  return one
}


export function hasAttribute(obj: object, name: string) {
  return Object.prototype.hasOwnProperty.call(obj, name)
}

/**
 * Array to Object e.g. ['a', 'b'] => { a: undefined, b: undefined }
 * @param {string[]} arr 
 */
export function mapToObject(arr: string[] | Instruction<any>[], defaultValue: undefined | ((key: string) => any) = undefined) {
  if (typeof arr[0] === 'string' && arr.length !== [...new Set(arr as any)].length) {
    // 参数重复
    throw new Error(`Duplicate parameter: ${arr.join(',')}`)
  }
  const obj = Object.create(null)
  arr.forEach((item) => {
    let key
    if (item instanceof Instruction) {
      key = item.value
    } else {
      key = item
    }
    obj[key] = (typeof defaultValue === 'function' ? defaultValue(key) : defaultValue)
  })
  return obj
}

export function someCondition(...args) {
  const errMsg = args.pop();

  if (!args.find(d => !!d)) {
    throw new Error(errMsg)
  }
}
/**
 * 
 * @param keyQueue ["obj", "arr"] key path
 * @param scope 当前作用域
 * @param values 顶层作用域
 */
export function getReference(keyQueue: string[], scope: Record<string, any>, values: Record<string, any>): Reference {
  if (keyQueue.length < 2) return hasAttribute(scope, keyQueue[0]) ? scope[keyQueue[0]] : values[keyQueue[0]];
  let path = keyQueue.shift();
  const lastKey = keyQueue.pop();
  let target = hasAttribute(scope, path) ? scope : values;
  while (path) {
    if (hasAttribute(target, path)) {
      target = target[path];
    } else if (!target) {
      throw new TypeError(`Uncaught TypeError: Cannot read property '${path}' of ${target}`)
    } else {
      target = undefined
    }
    path = keyQueue.shift()
  }
  console.log('target: ', target, lastKey);
  return new Reference(target, lastKey)
}

export class Reference {
  destoryed: boolean;

  constructor(public target: any, public path: string) {
    this.destoryed = false
  }

  setValue(value) {
    if(this.destoryed) return value
    return (this.target[this.path] = value)
  }

  getValue() {
    if(this.destoryed) return undefined
    return this.target[this.path]
  }

  destory() {
    // 使用一次就释放掉内存
    this.destoryed = true
    this.target = null;
  }
}