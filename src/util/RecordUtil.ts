import { isNull, isUndefined } from "./Check"

type ObjectDes<T = any> = Record<string, T>

export function excludeNullish(value: ObjectDes<string | number | undefined>) {
  return Object.keys(value).reduce((result, current) => {
    const temp = value[current];
    const tempStr = `${temp ?? ''}`.trim();
    if (isNull(temp) || isUndefined(temp) || !tempStr.length) return result
    return {
      ...result,
      [current]: temp
    }
  }, {})
}

export function pickItems<T = any>(value: ObjectDes, keys: string[]) {
  return Object.keys(keys).reduce((result, key) => {
    return {
      ...result,
      [key]: value[key]
    }
  }, {}) as T
}