import { isArray, isNumber } from "./Check";
import { isFunction } from "./Check";

type ArrayItem<T extends Array<any>> = T extends Array<infer E> ? E : any
/**
 * 连续查找数组元素
 * @param value 待查找数组
 * @param predicate 
 * @param start 起始位置默认为0
 * @returns 
 */
export function findItem<T extends Array<any>>(value: T, predicate: (item: ArrayItem<T>) => boolean, start = 0) {
  if (!isArray(value)) throw new Error('params[0] 必须可iterator')
  if (!isNumber(start)) throw new Error('params[2] 必须是数字')
  if (!isFunction(predicate)) throw new Error('params[1] 必须是一个函数');
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
          return findItem(value, newPredicate ?? predicate, i + 1)
        }
      }
    }
  }
}

/**
 * 查找item第N次出现的信息
 * @param value 
 * @param predicate 
 * @param nth 
 * @returns 
 */
export function findItemNthOccurrenceIndex<T extends Array<any>>(value: T, predicate: (item: ArrayItem<T>) => boolean, nth = 1) {
  if (nth == 0) throw new Error("params[2] nth 不能为0");
  const counts = countItemOccurrences(value, predicate);
  let index = nth > 0 ? nth - 1 : counts.times + nth
  return counts.items[index];
}

/**
 * 统计元素出现的次数
 * @param value 
 * @param predicate 
 * @returns 
 */
export function countItemOccurrences<T extends Array<any>>(value: T, predicate: (item: ArrayItem<T>) => boolean) {
  let items = [];
  let findResult = findItem(value, predicate);
  while (findResult) {
    items.push({
      index: findResult.index,
      value: findResult.value
    })
    findResult = findResult.next();
  }

  return {
    items,
    times: items.length
  }
}