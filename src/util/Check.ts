export const typeOfValue = (type: string) => (value: any) => typeof value == type

/** 浏览器环境检查 */
export function isStandardBrowserEnv() {
  return window && document
}
export function isFunction(value: any): value is Function {
  return typeOfValue('function')(value)
}

export function isNumber(value: any): value is number {
  return typeOfValue('number')(value)
}

export function isArray(value: any): value is Array<any> {
  return Array.isArray(value)
}

export function isThenable(value: any): value is (PromiseLike<any> | Promise<any>) {
  return (
    (typeOfValue('object')(value) || isFunction(value))) &&
    isFunction(value?.then) &&
    (isFunction(value?.catch))
}