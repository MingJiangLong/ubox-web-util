import { isArray, isNumber } from "./Check";
import { isFunction } from "./isFunction";

type ArrayItem<T extends Array<any>> = T extends Array<infer E> ? E : any
/**
 * 连续查找数组元素
 * @param value 待查找数组
 * @param predicate 
 * @param start 起始位置默认为0
 * @returns 
 */
export function findFromArray<T extends Array<any>>(value: T, predicate: (item: ArrayItem<T>) => boolean, start = 0) {
  if (!isArray(value)) throw new Error('params[0] 必须可iterator')
  if (!isFunction(predicate)) throw new Error('params[1] 必须是一个函数');
  if (!isNumber(start)) throw new Error('params[2] 必须是数字')
  for (let i = start; i < value.length; i++) {
    let current = value[i];

    let result: ArrayItem<T> | undefined = undefined
    if (typeof predicate === 'function') {
      if (predicate(current)) {
        result = current
      }
    }
    if (result) {
      return {
        index: i,
        value: result,
        next(newPredicate?: (item: ArrayItem<T>) => boolean) {
          return findFromArray(value, newPredicate ?? predicate, i + 1)
        }
      }
    }
  }
}