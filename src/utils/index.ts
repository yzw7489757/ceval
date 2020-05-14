import { quoteReg } from './regExp';

const toString = Object.prototype.toString

export function isObject(obj: object): obj is object {
  return toString.call(obj) === '[object Object]'
}

/**
 * @export
 * @template T
 * @param {T[]} arr
 * @param {T} value
 * @returns {boolean}
 */
export function contains<T extends any>(arr: T[], value: T): boolean {
  return arr.some(v => v === value)
}

/**
 * 获取日期时间
 * @export getTime
 * @param {number} [offset=0] 偏移量
 * @returns {string[]} [date, time]
 */
export function getTime(offset = 0): string[] {
  const time = new Date(Date.now() + offset).toLocaleString()
  let clock: string = time.match(/\d+\:\d+:\d+$/)[0];
  if (parseInt(clock.match(/\d+/)[0], 10) < 10) {
    clock = `0${clock}`
  }
  const date = time.split(' ')[0].replace(/\//g, '-')
  return [date, clock]
}


/**
 * 递归foreach
 * @export
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
 * merge two objects, the former is dominant
 * @template T object
 * @param {T} target
 * @param {T} source
 */
export function merge<T>(target: T, source: T) {
  Object.keys(source).forEach(key => {
    const v = source[key]
    if (Object.prototype.hasOwnProperty.call(target, key)) return
    if (v && typeof v === 'object') {
      merge(target[key] = {}, source[key])
    } else {
      target[key] = source[key]
    }
  })
}

/**
 * 替换\'\' \"\" 在 处理 in operator 需要到
 * @param {string} str string Field
 * @returns {string} 没有对称引号的字符串
 */
export function eliminateQuote(str: string): string {
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
 * @returns
 */
export function filterUndefine (...args) {
  let one
  args.some(item => {
    if(contains([undefined, null, true, false], item)) return false
    one = item
    return true;
  })
  return one
}