import { ArrayItem } from "./TypeHelper";
/**
 * 连续查找数组元素
 * @param value 待查找数组
 * @param predicate 
 * @param start 起始位置默认为0
 * @returns 
 */
export function findItem<T extends Array<any>>(value: T, predicate: (item: ArrayItem<T>) => boolean, start = 0) {
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

export function isArray(value: any): value is Array<any> {
  return Array.isArray(value)
}

export function isNotArray(value: any): value is Exclude<typeof value, Array<any>> {
  return !isArray(value)
}