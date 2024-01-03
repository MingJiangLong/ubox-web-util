import { NULL_STRING } from "../constant"

export const typeOfValue = (type: string) => (value: any) => typeof value == type

/** 浏览器环境检查 */
export function isStandardBrowserEnv() {
  return window && document
}
export function isFunction(value: any): value is Function {
  return typeOfValue('function')(value)
}

export function isNumber(value: any): value is number {
  return typeOfValue('number')(value) && !isNaN(value)
}

/** 
 * 判断是否是数字 
 * 包括数字以及数字字符串
 * */
export function isNumberic(value: any) {
  return isNumber(value) || (isString(value) && value.trim() != NULL_STRING && isNumber(+value))
}

export function isArray(value: any): value is Array<any> {
  return Array.isArray(value)
}

export function isNotArray(value: any): value is Exclude<typeof value, Array<any>> {
  return !isArray(value)
}

export function isUndefined(value: any): value is undefined {
  return value === undefined
}
export function isNull(value: any): value is null {
  return value === null
}

export function isThenable(value: any): value is (PromiseLike<any> | Promise<any>) {
  return (
    (typeOfValue('object')(value) || isFunction(value))) &&
    isFunction(value?.then) &&
    (isFunction(value?.catch))
}

export function isBoolean(value: any): value is boolean {
  return value === true || value === false
}

export function isString(value: any): value is string {
  return typeOfValue("string")(value)
}

export function isIterator(value: any) {
  return !isNull(value) && isFunction(value[Symbol.iterator])
}

/**
 * 大于0且不超过两位小数
 * @param value 
 */
export function isPositiveAndLessThanTwoDecimalNumber(value: any) {
  return /^\d+(.\d{1,2})?$/ && value > 0
}