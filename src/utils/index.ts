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
export function contains<T extends any>(arr:T[], value:T): boolean {
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
  if(parseInt(clock.match(/\d+/)[0], 10) < 10){
    clock = `0${clock}`
  }
  const date = time.split(' ')[0].replace('/', '-')
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
export function mapVal<T extends object>(data: T, object: object, cb: (data: T, key:string, val: any) => void) {
  Object.keys(object).map(key => {
    return isObject(object[key]) ? mapVal(data, object[key], cb) : cb(data, key, object[key])
  })
  return data
}